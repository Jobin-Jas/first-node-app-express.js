const auth = require('registry-auth-token');
const query = require('../db/db-connection');
class ProfileModel {
    tableName = 'profiles';

    find = async (user) => {
        let sql = `SELECT * FROM ${this.tableName}
        WHERE user_id = ?`;
        return await query(sql, [user]);
    }

    create = async ({ user, address }) => {
        const sql = `INSERT INTO ${this.tableName}
        (user_id, address) VALUES (?,?)`;

        const result = await query(sql, [user, address]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new ProfileModel;
