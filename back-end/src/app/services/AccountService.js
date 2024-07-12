const db = require('../../configs/DatabaseConfig.js');

module.exports.getListRole = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM Role');
        return rows;
    } catch (err) {
        console.error('Failed to connect to the database\n', err);
        throw err;
    }
};

module.exports.register = async (username, email, password) => {
    try {
        const query = `
            INSERT INTO account (
                \`Username\`,
                \`Email\`,
                \`Password\`,
                \`RoleID\`
            ) VALUES (?, ?, ?, 2)
        `;
        const values = [username, email, password];
        const [result] = await db.query(query, values);
        return result;
    } catch (err) {
        console.error('Failed to register user:', err);
        throw err;
    }
}