const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const { gerarToken } = require('./authController');

class UserController {
  async buscarUsers(req, res) {
    const { Email, Senha } = req.body;

    try {
      if (!Email || !Senha) {
        return res.status(400).json({
          sucesso: false,
          erro: 'E-mail e senha são obrigatórios',
        });
      }

      const resposta = await userModel.buscarUsers(Email);

      if (!resposta || resposta.length === 0) {
        return res.status(404).json({
          sucesso: false,
          erro: 'Usuário não encontrado',
        });
      }

      const usuario = resposta[0];
      const senhaValida = await bcrypt.compare(String(Senha), usuario.Senha);

      if (!senhaValida) {
        return res.status(401).json({
          sucesso: false,
          erro: 'Senha incorreta',
        });
      }

      const token = gerarToken(usuario);

      res.cookie('token', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json({
        sucesso: true,
        usuario,
        ...(process.env.NODE_ENV !== 'production' && { token }),
      });
    } catch (erro) {
      console.error('Erro ao buscar usuário:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }
}

module.exports = new UserController();
