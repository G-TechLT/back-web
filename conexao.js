const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'turntable.proxy.rlwy.net',
  port: 34999,
  user: 'root',
  password: 'fDZBbIwMqDHFyaljVnjESLMYJooyEmyN',
  database: 'railway',
});

module.exports = conexao;
