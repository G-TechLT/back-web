const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Statum!123",
  database: "nome_do_banco",
});

module.exports = conexao;
