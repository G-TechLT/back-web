const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'caboose.proxy.rlwy.net',
  port: 40989,
  user: 'root',
  password: 'VJbchauvFMCEmBRdfaWINdNAxfQQbJwL',
  database: 'railway',
  connectTimeout: 10000, // 10 segundos
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
  }
});

module.exports = conexao;
