const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'metro.proxy.rlwy.net',
  port: 3306,
  user: 'root',
  password: 'EpcYqAbewfLjZIhNXuNCaAvBuMYHjxDp',
  database: 'railway',
});

module.exports = conexao;
