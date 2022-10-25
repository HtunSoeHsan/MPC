const mysql = require('mysql');

var db = mysql.createConnection({
    database : 'sql10528054',
    host     : 'sql10.freemysqlhosting.net',
    user     : 'sql10528054',
    password : 'vSriFRHPZw'
  });
  
  db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + db.threadId);
  });
// 
const orm = {
    async selectAll(tableName) {
        const query = `SELECT * FROM ${tableName}`;
        const table = await db.query(query);
        return table;
    },

    async selectWhich(tableName, variableQuery) {
        const query = `SELECT ${variableQuery} FROM ${tableName}`;
        const table = await db.query(query);
        return table;
    },

    async findOne(tableName, targetQuery, indexQuery) {
        const query = `SELECT ${targetQuery} FROM ${tableName} WHERE ${indexQuery}`;
        const table = await db.query(query);
        return table;
    },

    async insertOne(tableName, variableQuery, dataQuery) {
        const query = `INSERT INTO ${tableName} ${variableQuery} VALUES ${dataQuery}`;
        await db.query(query);
    },

    async updateOne(tableName, changeQuery, indexQuery) {
        const query = `UPDATE ${tableName} SET ${changeQuery} WHERE ${indexQuery}`;
        await db.query(query);
    },

    async directQuery(str) {
        return await db.query(str);
    },

    async deleteOne(tableName, indexQuery) {
        const query = `DELETE FROM ${tableName} WHERE ${indexQuery}`;
        await db.query(query);
    }

};

module.exports = orm;