const db = require('../../configs/DatabaseConfig.js');

module.exports.getListGenre = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM genre ORDER BY GenreName');
        return rows;
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};



module.exports.getManga = async (id) => {
    try {
        const [mangaRow] = await db.query(
            'SELECT * FROM manga WHERE MangaID = ?', 
            [id]
        );

        const [genreRows] = await db.query(
            `select g.GenreID, g.GenreName
            from mangagenre mg
	            join genre g on mg.GenreID = g.GenreID
            where MangaId = ?;`, 
            [id]
        );

        const [chapterRows] = await db.query(
            `select ChapterID, ChapterName, PublishedDate 
            from chapter
            where MangaId = ?
            order by 
                CAST(SUBSTRING_INDEX(chaptername, ' ', -1) AS DECIMAL) desc,
                LENGTH(chaptername),
                chaptername;`, 
            [id]
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