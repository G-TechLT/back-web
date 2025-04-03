const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Farias!123',
  database: 'nome_do_banco',
});

module.exports = conexao;
