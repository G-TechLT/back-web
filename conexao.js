const mysql = require('mysql2');

// Cria um pool de conexões
const conexao = mysql.createPool({
  host: 'caboose.proxy.rlwy.net',
  port: 40989,
  user: 'root',
  password: 'VJbchauvFMCEmBRdfaWINdNAxfQQbJwL',
  database: 'railway',
  waitForConnections: true, // Espera se todas as conexões estiverem ocupadas
  connectionLimit: 10, // Número máximo de conexões abertas ao mesmo tempo
  queueLimit: 0, // Sem limite de requisições na fila
});

// Testa a conexão
conexao.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
    connection.release(); // Libera a conexão de volta para o pool
  }
});

module.exports = conexao;
