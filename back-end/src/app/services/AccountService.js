
const SUCCESS = 1005;
const FAILED = 1006;

module.exports = { 
    SUCCESS_CODE: SUCCESS,
    FAILED_CODE: FAILED,
};

const db = require('../../configs/DatabaseConfig.js');


module.exports.updateUsername = async (accountId, newUsername) => {
    try {
        const query = `
            UPDATE account
            SET
                \`Username\` = ?
            WHERE \`AccountID\` = ?;
        `;
        const values = [newUsername, accountId];
        const [result] = await db.query(query, values);

        console.log(result);

        return { code: UPDATE_SUCCESS, message: 'Update username successfully.' };
    } catch (err) {
        console.error('Failed to update successfully:', err);
        throw err;
    }
}


module.exports.changePassword = async (accountId, newPassword) => {
    try {
        const query = `
            UPDATE account
            SET
                \`Password\` = ?
            WHERE \`AccountID\` = ?;
        `;
        const values = [newPassword, accountId];
        const [result] = await db.query(query, values);

        return { code: UPDATE_SUCCESS, message: 'Change password successfully.' };;
    } catch (err) {
        console.error('Failed to change password:', err);
        throw err;
    }
}

module.exports.likeManga = async (accountId, mangaId) => {
    try {
        const query = `INSERT INTO \`like\` (AccountID, MangaID) VALUES (?, ?);`;

        const values = [accountId, mangaId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Like manga successfully.' };;

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { code: FAILED, message: 'MangaId=' + mangaId + ' not exists.' };
        }

        if (err.code === 'ER_DUP_ENTRY') {
            return { code: FAILED, message: 'Already like this manga.' };
        }

        console.error('Failed to like manga:', err);
        throw err;
    }
}

module.exports.followManga = async (accountId, mangaId) => {
    try {
        const query = `INSERT INTO \`follow\` (AccountID, MangaID) VALUES (?, ?);`;

        const values = [accountId, mangaId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Follow manga successfully.' };;

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { code: FAILED, message: 'MangaId=' + mangaId + ' not exists.' };
        }

        if (err.code === 'ER_DUP_ENTRY') {
            return { code: FAILED, message: 'Already follow this manga.' };
        }

        console.error('Failed to follow manga:', err);
        throw err;
    }
}

module.exports.unlikeManga = async (accountId, mangaId) => {
    try {
        const query = `DELETE FROM \`like\` WHERE AccountID = ? AND MangaID = ?;`;

        const values = [accountId, mangaId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Unlike manga successfully.' };;

    } catch (err) {
        console.error('Failed to unlike manga:', err);
        throw err;
    }
}

module.exports.unfollowManga = async (accountId, mangaId) => {
    try {
        const query = `DELETE FROM \`follow\` WHERE AccountID = ? AND MangaID = ?;`;

        const values = [accountId, mangaId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Unlike manga successfully.' };;

    } catch (err) {
        console.error('Failed to unlike manga:', err);
        throw err;
    }
}

module.exports.getListLike = async (accountId, pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query('SELECT COUNT(MangaID) as total FROM \`like\` WHERE AccountID = ?', [accountId]);
        
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
            FROM 
	            \`like\` li
                JOIN manga m ON li.MangaId = m.MangaID
            WHERE 
	            li.AccountID = ?
            LIMIT ? OFFSET ?`,
            [accountId, itemsPerPage, offset]
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

module.exports.getListFollow = async (accountId, pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query('SELECT COUNT(MangaID) as total FROM \`follow\` WHERE AccountID = ?', [accountId]);
        
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
            FROM 
	            \`follow\` li
                JOIN manga m ON li.MangaId = m.MangaID
            WHERE 
	            li.AccountID = ?
            LIMIT ? OFFSET ?`,
            [accountId, itemsPerPage, offset]
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

module.exports.commentManga = async (accountId, mangaId, context) => {
    try {
        const query = `
        INSERT INTO commentmanga 
            (\`AccountID\`, \`MangaID\`, \`Context\`) 
        VALUES 
            (?, ?, ?);
        `;

        const values = [accountId, mangaId, context];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Comment manga successfully.' };;

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { code: FAILED, message: 'MangaId=' + mangaId + ' not exists.' };
        }

        console.error('Failed to comment manga:', err);
        throw err;
    }
}

module.exports.commentChapter = async (accountId, chapterId, context) => {
    try {
        const query = `
        INSERT INTO commentchapter 
            (\`AccountID\`, \`ChapterID\`, \`Context\`) 
        VALUES 
            (?, ?, ?);
        `;

        const values = [accountId, chapterId, context];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Comment chapter successfully.' };;

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { code: FAILED, message: 'ChapterId=' + chapterId + ' not exists.' };
        }

        console.error('Failed to comment chapter:', err);
        throw err;
    }
}