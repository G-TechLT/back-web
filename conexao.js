const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'turntable.proxy.rlwy.net',
  port: 34999,
  user: 'root',
  password: 'fDZBbIwMqDHFyaljVnjESLMYJooyEmyN',
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
