const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',    
  password: 'Mateus12feijoada',  
  database: 'library_app' 
});

module.exports = db.promise();


