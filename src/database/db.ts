const mysql = require('mysql2');

const banco = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: 'root',    
  password: 'Mateus12feijoada',  
  database: 'library_app' 
});

module.exports = banco.promise();


