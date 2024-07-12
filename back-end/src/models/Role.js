const db = require('../configs/DatabaseConfig.js');

class Role {
    constructor(roleName) {
        this.roleName = roleName;
    }

    async save() {
        let q = `
        INSERT INTO role(
            RoleName
        )
        VALUES(
            '${this.roleName}'
        )
        `;

        const [newRole, _] = await db.execute(sql);

        return newRole;
    }

    
}


module.exports = Role;