const RoleEnum = {
    ADMIN: 1,
    TRANSLATOR: 2,
    USER: 3,
};

const EMAIL_EXIST = 1000;
const REGISTER_SUCCESS = 1001;
const REGISTER_FAILED = 1002;

const LOGIN_SUCCESS = 1003;
const LOGIN_FAILED = 1004;

const UPDATE_SUCCESS = 1005;
const UPDATE_FAILED = 1006;

module.exports = { 
    RoleEnum,

    EMAIL_EXIST_CODE: EMAIL_EXIST,
    REGISTER_SUCCESS_CODE: REGISTER_SUCCESS,
    REGISTER_FAILED_CODE: REGISTER_FAILED,

    LOGIN_SUCCESS_CODE: LOGIN_SUCCESS,
    LOGIN_FAILED_CODE: LOGIN_FAILED,

    UPDATE_SUCCESS_CODE: UPDATE_SUCCESS,
    UPDATE_FAILED_CODE: UPDATE_FAILED,
};

const db = require('../../configs/DatabaseConfig.js');


module.exports.register = async (username, email, password, roleId) => {
    try {
        const query = `
            INSERT INTO account (
                \`Username\`,
                \`Email\`,
                \`Password\`,
                \`RoleID\`
            ) VALUES (?, ?, ?, ?)
        `;
        const values = [username, email, password, roleId];
        const [result] = await db.query(query, values);

        return { code: REGISTER_SUCCESS, message: 'Register account successfully.' };;
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return { code: EMAIL_EXIST, message: 'Email already exists.' };
        }

        console.error('Failed to register account:', err);
        throw err;
    }
}


module.exports.login = async (email, password) => {
    try {
        const query = `
            SELECT accountId, password, roleId FROM account WHERE email = ?
        `;
        const values = [email];
        const [rows] = await db.query(query, values);

        if (rows.length === 0) {
            return { code: LOGIN_FAILED, message: 'Invalid email or password.' };
        }

        const storedPassword = rows[0].password;
        const accountId = rows[0].accountId;
        const roleId = rows[0].roleId;
        if (password === storedPassword) {
            return { 
                code: LOGIN_SUCCESS, 
                message: 'Login successfully.', 
                accountId: accountId, 
                roleId: roleId 
            };
        } else {
            return { 
                code: LOGIN_FAILED, 
                message: 'Invalid email or password.' 
            };
        }

    } catch (err) {
        console.error('Failed to login account:', err);
        throw err;
    }
}


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

        return { code: UPDATE_SUCCESS, message: 'Update username successfully.' };;
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