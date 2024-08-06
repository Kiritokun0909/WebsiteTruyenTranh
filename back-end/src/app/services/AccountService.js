const bcrypt = require('bcrypt');
const saltRounds = 10;

const SUCCESS = 1005;
const FAILED = 1006;
const LIKE = 1007;
const NOT_LIKE = 1008;

module.exports = { 
    SUCCESS_CODE: SUCCESS,
    FAILED_CODE: FAILED,
    LIKE_CODE: LIKE,
    NOT_LIKE_CODE: NOT_LIKE,
};

const db = require('../../configs/DatabaseConfig.js');

module.exports.getUsername = async (accountId) => {
    try {
        const [result] = await db.query(`
            SELECT username 
            FROM account
            WHERE \`AccountID\` = ?;
        `, [accountId]);

        return { 
            code: SUCCESS, 
            message: 'Get username successfully.',
            username: result[0].username
        };
    } catch (err) {
        console.error('Failed to get username successfully:', err);
        throw err;
    }
}

module.exports.updateUsername = async (accountId, newUsername) => {
    try {
        const [result] = await db.query(`
            UPDATE account
            SET
                \`Username\` = ?
            WHERE \`AccountID\` = ?;
        `, [newUsername, accountId]);

        return { 
            code: SUCCESS,
            message: 'Update username successfully.'
        };
    } catch (err) {
        console.error('Failed to update username successfully:', err);
        throw err;
    }
}

module.exports.changePassword = async (accountId, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const [result] = await db.query(`
            UPDATE account
            SET
                \`Password\` = ?
            WHERE \`AccountID\` = ?;
        `, [hashedPassword, accountId]);

        return { 
            code: SUCCESS, 
            message: 'Change password successfully.' 
        };
    } catch (err) {
        console.error('Failed to change password:', err);
        throw err;
    }
}


module.exports.isLike = async (accountId, mangaId) => {
    try {
        const [row] = await db.query(`
            SELECT AccountID
            FROM \`like\` 
            WHERE AccountID = ? AND MangaID = ?;
        `, [accountId, mangaId]);

        if (row.length === 0) {
            return { 
                code: NOT_LIKE, 
                message: 'AccountId=' + accountId + ' does not like MangaId='+ mangaId + '.' 
            };
        }

        return { 
            code: LIKE, 
            message: 'AccountId=' + accountId + ' likes MangaId='+ mangaId + '.' 
        };

    } catch (err) {
        console.error('Failed to query is like manga:', err);
        throw err;
    }
}

module.exports.isFollow = async (accountId, mangaId) => {
    try {
        const [row] = await db.query(`
            SELECT AccountID
            FROM \`follow\` 
            WHERE AccountID = ? AND MangaID = ?;
        `, [accountId, mangaId]);

        if (row.length === 0) {
            return { 
                code: NOT_LIKE, 
                message: 'AccountId=' + accountId + ' does not follow MangaId='+ mangaId + '.' 
            };
        }

        return { 
            code: LIKE, 
            message: 'AccountId=' + accountId + ' follows MangaId='+ mangaId + '.' 
        };

    } catch (err) {
        console.error('Failed to query is follow manga:', err);
        throw err;
    }
}


module.exports.likeManga = async (accountId, mangaId) => {
    try {
        const [result] = await db.query(`
            INSERT INTO \`like\` (AccountID, MangaID) VALUES (?, ?);
        `, [accountId, mangaId]);

        // Update +1 like for manga
        const [infoRow] = await db.query(`
            SELECT NumLikes FROM manga WHERE MangaID = ?;
        `, [mangaId]);

        const NumLikes = infoRow[0].NumLikes + 1;
        const [updateNumLikes] = await db.query(`
            UPDATE manga
            SET
                \`NumLikes\` = ?
            WHERE MangaID = ?;
        `, [NumLikes, mangaId]);

        return { 
            code: SUCCESS, 
            message: 'Like manga successfully.' 
        };;

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { 
                code: FAILED, 
                message: 'MangaId=' + mangaId + ' not exists.' 
            };
        }

        if (err.code === 'ER_DUP_ENTRY') {
            return { 
                code: FAILED, 
                message: 'Already like this manga.' 
            };
        }

        console.error('Failed to like manga:', err);
        throw err;
    }
}

module.exports.unlikeManga = async (accountId, mangaId) => {
    try {
        const [result] = await db.query(`
            DELETE FROM \`like\` WHERE AccountID = ? AND MangaID = ?;
        `, [accountId, mangaId]);

        // Update -1 like for manga
        const [infoRow] = await db.query(`
            SELECT NumLikes FROM manga WHERE MangaID = ?;
        `, [mangaId]);

        var NumLikes = (infoRow[0].NumLikes - 1);
        NumLikes = NumLikes > 0 ? NumLikes : 0;

        const [updateNumLikes] = await db.query(`
            UPDATE manga
            SET
                \`NumLikes\` = ?
            WHERE MangaID = ?;
        `, [NumLikes, mangaId]);

        return { 
            code: SUCCESS, 
            message: 'Unlike manga successfully.' 
        };

    } catch (err) {
        console.error('Failed to unlike manga:', err);
        throw err;
    }
}


module.exports.followManga = async (accountId, mangaId) => {
    try {
        const [result] = await db.query(`
            INSERT INTO \`follow\` (AccountID, MangaID) VALUES (?, ?);
        `, [accountId, mangaId]);

        // Update +1 follow for manga
        const [infoRow] = await db.query(`
            SELECT NumFollows FROM manga WHERE MangaID = ?;
        `, [mangaId]);

        const NumFollows = infoRow[0].NumFollows + 1;
        const [updateNumFollows] = await db.query(`
            UPDATE manga
            SET
                \`NumFollows\` = ?
            WHERE MangaID = ?;
        `, [NumFollows, mangaId]);

        return { 
            code: SUCCESS, 
            message: 'Follow manga successfully.' 
        };

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { 
                code: FAILED, 
                message: 'MangaId=' + mangaId + ' not exists.' 
            };
        }

        if (err.code === 'ER_DUP_ENTRY') {
            return { 
                code: FAILED, 
                message: 'Already follow this manga.' 
            };
        }

        console.error('Failed to follow manga:', err);
        throw err;
    }
}

module.exports.unfollowManga = async (accountId, mangaId) => {
    try {
        const [result] = await db.query(`
            DELETE FROM \`follow\` WHERE AccountID = ? AND MangaID = ?;
        `, [accountId, mangaId]);

        // Update -1 follow for manga
        const [infoRow] = await db.query(`
            SELECT NumFollows FROM manga WHERE MangaID = ?;
        `, [mangaId]);

        var NumFollows = (infoRow[0].NumFollows - 1);
        NumFollows = NumFollows > 0 ? NumFollows : 0;
        const [updateNumFollows] = await db.query(`
            UPDATE manga
            SET
                \`NumFollows\` = ?
            WHERE MangaID = ?;
        `, [NumFollows, mangaId]);

        return { 
            code: SUCCESS, 
            message: 'Unfollow manga successfully.' 
        };

    } catch (err) {
        console.error('Failed to unfollow manga:', err);
        throw err;
    }
}


module.exports.getListLike = async (accountId, pageNumber = 1, itemsPerPage = 5) => {
    try {
        const [totalRows] = await db.query(`
            SELECT COUNT(MangaID) as total 
            FROM \`like\` 
            WHERE AccountID = ?
        `, [accountId]);
        
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
        const [rows] = await db.query(`
            SELECT m.mangaId, m.coverImageUrl, m.mangaName, m.newChapterName
            FROM 
	            \`like\` li
                JOIN manga m ON li.MangaId = m.MangaID
            WHERE 
	            li.AccountID = ?
            LIMIT ? OFFSET ?
        `, [accountId, itemsPerPage, offset]);

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
        const [totalRows] = await db.query(`
            SELECT COUNT(MangaID) as total 
            FROM \`follow\` WHERE AccountID = ?
        `, [accountId]);
        
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
        const [rows] = await db.query(`
            SELECT m.mangaId, m.coverImageUrl, m.mangaName, m.newChapterName
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
        const [result] = await db.query(`
            INSERT INTO commentmanga 
                (\`AccountID\`, \`MangaID\`, \`Context\`) 
            VALUES 
                (?, ?, ?);
        `, [accountId, mangaId, context]);

        return { 
            code: SUCCESS, 
            message: 'Comment manga successfully.' 
        };

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { 
                code: FAILED, 
                message: 'MangaId=' + mangaId + ' not exists.' 
            };
        }

        console.error('Failed to comment manga:', err);
        throw err;
    }
}

module.exports.commentChapter = async (accountId, chapterId, context) => {
    try {
        const [result] = await db.query(`
            INSERT INTO commentchapter 
                (\`AccountID\`, \`ChapterID\`, \`Context\`) 
            VALUES 
                (?, ?, ?);
        `, [accountId, chapterId, context]);

        return { 
            code: SUCCESS, 
            message: 'Comment chapter successfully.' 
        };

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { 
                code: FAILED, 
                message: 'ChapterId=' + chapterId + ' not exists.' 
            };
        }

        console.error('Failed to comment chapter:', err);
        throw err;
    }
}