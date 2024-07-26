
const SUCCESS = 1005;
const FAILED = 1006;

module.exports = { 
    SUCCESS_CODE: SUCCESS,
    FAILED_CODE: FAILED,
};

const db = require('../../configs/DatabaseConfig.js');

module.exports.addManga = async (mangaName, authorName, coverImageUrl, description, ageLimit, accountId) => {
    try {
        const query = `
            INSERT INTO manga(
                \`StoryName\`,
                \`AuthorName\`,
                \`CoverImageUrl\`,
                \`Description\`,
                \`AgeLimit\`,
                \`AccountID\`
            ) VALUES(?, ?, ?, ?, ?, ?);
        `;
        const values = [mangaName, authorName, coverImageUrl, description, ageLimit, accountId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Add new manga successfully.' };;
    } catch (err) {
        console.error('Failed to add new manga:', err);
        throw err;
    }
}

module.exports.setMangaHideStatus = async (mangaId, isHide = false) => {
    try {
        const query = `
            UPDATE manga
            SET
                \`IsBlocked\` = ?
            WHERE MangaID = ?;
        `;
        const hideStatus = isHide ? 1 : 0;
        const values = [hideStatus, mangaId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Update manga hide status successfully.' };;
    } catch (err) {
        console.error('Failed to update manga hide status manga:', err);
        throw err;
    }
}

module.exports.removeManga = async (mangaId) => {
    try {
        const query = `
            DELETE FROM manga
            WHERE MangaId = ?;
        `;
        const values = [mangaId];
        const [result] = await db.query(query, values);

        return { code: SUCCESS, message: 'Remove manga successfully.' };;
    } catch (err) {
        console.error('Failed to remove manga:', err);
        throw err;
    }
}

module.exports.addChapter = async (chapterName, mangaId) => {
    try {
        const [insertRow] = await db.query(`
            INSERT INTO chapter(
                \`ChapterName\`,
                \`MangaID\`
            ) VALUES(?, ?);
        `, [chapterName, mangaId]);

        const chapterId = insertRow.insertId;

        const [infoRow] = await db.query(`
            SELECT publishedDate FROM chapter WHERE ChapterID = ?;
        `, [chapterId]);

        const updateDate = infoRow[0].publishedDate;

        const [updateManga] = await db.query(`
            UPDATE manga
            SET
                \`NumChapter\` = ?,
                \`UpdateDate\` = ?
            WHERE MangaID = ?;
        `, [chapterName, updateDate, mangaId]);

        return { code: SUCCESS, message: 'Add new chapter successfully.', chapterId: chapterId};
    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return { code: FAILED, message: 'MangaID=' + mangaId + ' not exists.' };
        }

        console.error('Failed to add new chapter:', err);
        throw err;
    }
}

module.exports.addChapterImages = async (chapterImages, chapterId) => {
    try {
        for (let i = 0; i < chapterImages.length; i++) {
            const query = `
                INSERT INTO chapterimage(
                    \`ChapterID\`,
                    \`OrderNumber\`,
                    \`ImageUrl\`
                ) VALUES(?, ?, ?);
            `;
            const values = [chapterId, chapterImages[i].orderNumber, chapterImages[i].imageUrl];
            const [result] = await db.query(query, values);
        }

        return { code: SUCCESS, message: 'Add list chapter image successfully.' };
    } catch (err) {
        console.error('Failed to add list chapter image:', err);
        throw err;
    }
}