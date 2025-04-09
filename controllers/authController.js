const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function gerarToken(usuario) {
  return jwt.sign({ id: usuario.ID, email: usuario.Email }, secretKey, {
    expiresIn: '1h',
  });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

module.exports = {
  gerarToken,
  verificarToken,
};
