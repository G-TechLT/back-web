const jwt = require('jsonwebtoken');

// Pegando a variável de ambiente corretamente
const SECRET_KEY = process.env.JWT_SECRET;

function gerarToken(usuario) {
  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET não está definido.');
  }

  return jwt.sign({ id: usuario.ID, email: usuario.Email }, SECRET_KEY, {
    expiresIn: '1h',
  });
}

function verificarToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  gerarToken,
  verificarToken,
};
