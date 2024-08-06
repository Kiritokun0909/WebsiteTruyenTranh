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
            `SELECT mangaId, coverImageUrl, mangaName, newChapterName 
            FROM manga 
            ORDER BY UpdateDate DESC 
            LIMIT ? OFFSET ?
            `, [itemsPerPage, offset]);

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
            `SELECT m.mangaId, m.coverImageUrl, m.mangaName, m.newChapterName
            FROM mangagenre mg
                JOIN (SELECT mangaId, coverImageUrl, mangaName, newChapterName FROM manga) as m ON mg.MangaID = m.MangaID
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

module.exports.getListMangaByKeyword = async (keywords = '', pageNumber = 1, itemsPerPage = 5) => {
    try {
        const keywordCondition = keywords ? 'WHERE MangaName LIKE ?' : '';
        const keywordQuery = keywords ? `%${keywords}%` : '';

        const [totalRows] = await db.query(`SELECT COUNT(MangaID) as total FROM manga ${keywordCondition}`, [keywordQuery]);
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
            `SELECT mangaId, coverImageUrl, mangaName, newChapterName 
            FROM manga ${keywordCondition} 
            ORDER BY UpdateDate DESC 
            LIMIT ? OFFSET ?
        `, [keywordQuery, itemsPerPage, offset]);

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

module.exports.getManga = async (mangaId) => {
    try {
        const [mangaRow] = await db.query(
            `SELECT 
                mangaId, mangaName, authorName, coverImageUrl, ageLimit
                , description, numViews, numLikes, numFollows   
            FROM 
                manga 
            WHERE 
                MangaID = ?`, 
            [mangaId]
        );

        if (mangaRow.length === 0) {
            return { code: NOT_FOUND, message: 'Cannot found manga with id=' + mangaId + '.' };
        }

        const [genreRows] = await db.query(`
            SELECT g.genreId, g.genreName
            FROM mangagenre mg
	            JOIN genre g ON mg.GenreID = g.GenreID
            WHERE MangaId = ?;`, [mangaId]);

        const [chapterRows] = await db.query(`
            SELECT chapterId, chapterName, publishedDate 
            FROM chapter
            WHERE MangaID = ?
            ORDER BY 
                CAST(SUBSTRING_INDEX(chaptername, ' ', -1) AS DECIMAL) desc,
                LENGTH(chaptername) desc
            ;`, [mangaId]);

        const formattedChapters = chapterRows.map(chapter => ({
            ...chapter,
            publishedDate: formatDate(chapter.publishedDate)
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
                current.chapterId,
                current.chapterName,
                mangainfo.mangaName,
                current.mangaId
            FROM chapter AS current
            JOIN manga as mangainfo
	            ON current.MangaID = mangainfo.MangaID
            WHERE current.ChapterID = ?
            LIMIT 1;
        `, [chapterId]);

        if (chapterInfoRows.length === 0) {
            return { code: NOT_FOUND, message: 'Cannot found chapter with id=' + chapterId + '.' };
        }

        const [chapterImageRows] = await db.query(`
            SELECT orderNumber, imageUrl 
            FROM chapterimage 
            WHERE ChapterID = ?
            ORDER BY OrderNumber ASC;
        `, [chapterId]);

        const mangaId = chapterInfoRows[0].mangaId;
        const [listChapterRows] = await db.query(`
            SELECT chapterId
            FROM chapter
            WHERE MangaId = ?
            ORDER BY 
                CAST(SUBSTRING_INDEX(ChapterName, ' ', -1) AS DECIMAL) DESC,
                LENGTH(ChapterName) DESC
            ;
        `, [mangaId]);

        // console.log(listChapterRows);
        // console.log('length=', listChapterRows.length);
        const index = listChapterRows.findIndex(chapter => chapter.chapterId === chapterId);
        // console.log('curr index=', index);
        

        const prev_index = (index + 1) >= listChapterRows.length ? null : (index + 1);
        const next_index = (index - 1) < 0 ? null : (index - 1);
        // console.log('Next index=', next_index);
        // console.log('Prev index=', prev_index);

        const prev_chapterid = prev_index === null ? prev_index : listChapterRows[prev_index].chapterId;
        const next_chapterid = next_index === null ? next_index : listChapterRows[next_index].chapterId;
        // console.log('Next ChapterID=', next_chapterid);
        // console.log('Prev ChapterID=', prev_chapterid);

        // Update +1 view for manga
        const [infoRow] = await db.query(`
            SELECT NumViews FROM manga WHERE MangaID = ?;
        `, [mangaId]);

        const NumViews = infoRow[0].NumViews + 1;

        const [updateManga] = await db.query(`
            UPDATE manga
            SET
                \`NumViews\` = ?
            WHERE MangaID = ?;
        `, [NumViews, mangaId]);

        return {
            mangaId: mangaId,
            mangaName: chapterInfoRows[0].mangaName,
            chapterName: chapterInfoRows[0].chapterName,
            previousChapterId: prev_chapterid,
            nextChapterId: next_chapterid,
            chapter: chapterImageRows
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};


module.exports.getMangaComment = async (mangaId = 1, pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query(
            `SELECT COUNT(MangaID) as total 
            FROM commentmanga 
            WHERE MangaID= ?;`
            , [mangaId]
        );
        const totalComments = totalRows[0].total;

        const totalPages = Math.ceil(totalComments / itemsPerPage);
        if (pageNumber > totalPages) {
            return { 
                pageNumber,
                totalPages, 
                comments: []
            };
        }

        const offset = (pageNumber - 1) * itemsPerPage;
        const [rows] = await db.query(
            `
            SELECT 
                a.username, cm.context, cm.commentDate
            FROM 
                commentmanga cm
	            JOIN account a on a.AccountID = cm.AccountID
            WHERE 
                cm.MangaID = ?
            ORDER BY 
                cm.CommentDate DESC
            LIMIT ? OFFSET ?;`,
            [mangaId, itemsPerPage, offset]
        );

        const formattedComments = rows.map(comment => ({
            ...comment,
            commentDate: formatDate(comment.commentDate)
        }));

        return {
            pageNumber,
            totalPages,
            comments: formattedComments 
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
}

module.exports.getChapterComment = async (chapterId = 1, pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query(
            `SELECT COUNT(ChapterID) as total 
            FROM commentchapter 
            WHERE ChapterID= ?;`
            , [chapterId]
        );
        const totalComments = totalRows[0].total;

        const totalPages = Math.ceil(totalComments / itemsPerPage);
        if (pageNumber > totalPages) {
            return { 
                pageNumber,
                totalPages, 
                comments: []
            };
        }

        const offset = (pageNumber - 1) * itemsPerPage;
        const [rows] = await db.query(
            `
            SELECT 
                a.username, cm.context, cm.commentDate
            FROM 
                commentchapter cm
	            JOIN account a on a.AccountID = cm.AccountID
            WHERE 
                cm.ChapterID = ?
            ORDER BY 
                cm.CommentDate DESC
            LIMIT ? OFFSET ?;`,
            [chapterId, itemsPerPage, offset]
        );

        const formattedComments = rows.map(comment => ({
            ...comment,
            commentDate: formatDate(comment.commentDate)
        }));

        return {
            pageNumber,
            totalPages,
            comments: formattedComments 
        };
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
}

