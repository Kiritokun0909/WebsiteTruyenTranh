const db = require('../../configs/DatabaseConfig.js');

const NOT_FOUND = 100;
module.exports = { 
    NOT_FOUND_CODE: NOT_FOUND,

};

module.exports.getListGenre = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM genre ORDER BY GenreName');
        return {
            genres: rows
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};

module.exports.getGenre = async (genreId) => {
    try {
        const [row] = await db.query('SELECT genreid, genrename FROM genre where genreid=?', [genreId]);

        if (row.length === 0) {
            return { code: NOT_FOUND, message: 'Cannot found genre with id=' + genreId + '.' };
        }

        return {
            genreId: row[0].genreid,
            genreName: row[0].genrename
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};

module.exports.getListManga = async (pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query('SELECT COUNT(MangaID) as total FROM manga');
        const totalMangas = totalRows[0].total;

        const totalPages = Math.ceil(totalMangas / itemsPerPage);
        if (pageNumber > totalPages) {
            return { 
                pageNumber,
                totalPages, 
                mangas: []
            };
        }

        const offset = (pageNumber - 1) * itemsPerPage;
        const [rows] = await db.query(
            'SELECT MangaID, CoverImageUrl, StoryName, NumChapter FROM manga LIMIT ? OFFSET ?',
            [itemsPerPage, offset]
        );

        return {
            pageNumber,
            totalPages,
            mangas: rows
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};


module.exports.getListMangaByGenre = async (genreId=1, pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query(
            `SELECT COUNT(MangaID) as total 
            FROM mangagenre 
            WHERE genreid= ?;`
            , [genreId]
        );
        const totalMangas = totalRows[0].total;

        const totalPages = Math.ceil(totalMangas / itemsPerPage);
        if (pageNumber > totalPages) {
            return { 
                pageNumber,
                totalPages, 
                mangas: []
            };
        }

        const offset = (pageNumber - 1) * itemsPerPage;
        const [rows] = await db.query(
            `SELECT m.MangaID, m.CoverImageUrl, m.StoryName, m.NumChapter
            FROM mangagenre mg
                JOIN (SELECT MangaID, CoverImageUrl, StoryName, NumChapter FROM manga) as m ON mg.MangaID = m.MangaID
            WHERE genreid = ?
            LIMIT ? OFFSET ?;`,
            [genreId, itemsPerPage, offset]
        );

        return {
            pageNumber,
            totalPages,
            mangas: rows
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
}


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

module.exports.getManga = async (mangaId) => {
    try {
        const [mangaRow] = await db.query(
            'SELECT * FROM manga WHERE MangaID = ?', 
            [mangaId]
        );

        if (mangaRow.length === 0) {
            return { code: NOT_FOUND, message: 'Cannot found manga with id=' + mangaId + '.' };
        }

        const [genreRows] = await db.query(
            `select g.GenreID, g.GenreName
            from mangagenre mg
	            join genre g on mg.GenreID = g.GenreID
            where MangaId = ?;`, 
            [mangaId]
        );

        const [chapterRows] = await db.query(
            `select ChapterID, ChapterName, PublishedDate 
            from chapter
            where MangaId = ?
            order by 
                CAST(SUBSTRING_INDEX(chaptername, ' ', -1) AS DECIMAL) desc,
                LENGTH(chaptername),
                chaptername;`, 
            [mangaId]
        );

        const formattedChapters = chapterRows.map(chapter => ({
            ...chapter,
            PublishedDate: formatDate(chapter.PublishedDate)
        }));

        return {
            manga: mangaRow,
            genres: genreRows,
            chapters: formattedChapters
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};


module.exports.getChapter = async (chapterId) => {
    try {
        const [chapterInfoRows] = await db.query(
            `SELECT 
                current.chapterid,
                current.chaptername,
                mangainfo.storyname,
                prev.chapterid AS prev_chapterid,
                next.chapterid AS next_chapterid,
                current.mangaid
            FROM chapter AS current
            LEFT JOIN chapter AS prev 
                ON prev.mangaid = current.mangaid 
                AND prev.chapterid < current.chapterid
            LEFT JOIN chapter AS next 
                ON next.mangaid = current.mangaid 
                AND next.chapterid > current.chapterid
            JOIN manga as mangainfo
	            ON current.mangaid = mangainfo.mangaid
            WHERE current.chapterid = ?
            ORDER BY prev.chapterid DESC, next.chapterid ASC
            LIMIT 1;`, 
            [chapterId]
        );

        if (chapterInfoRows.length === 0) {
            return { code: NOT_FOUND, message: 'Cannot found chapter with id=' + chapterId + '.' };
        }

        const [chapterImageRows] = await db.query(
            `select OrderNumber, ImageUrl 
            from chapterimage where chapterid = ?
            order by OrderNumber asc;`, 
            [chapterId]
        );

        return {
            mangaId: chapterInfoRows[0].mangaid,
            mangaName: chapterInfoRows[0].storyname,
            chapterName: chapterInfoRows[0].chaptername,
            previousChapterId: chapterInfoRows[0].prev_chapterid,
            nextChapterId: chapterInfoRows[0].next_chapterid,
            chapter: chapterImageRows
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};