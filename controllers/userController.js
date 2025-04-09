const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { gerarToken } = require('./authController'); // ou caminho relativo correto

class UserController {
  async buscarUsers(req, res) {
    const { Email, Senha } = req.body;

    try {
      if (!Email || !Senha) {
        return res
          .status(400)
          .json({ sucesso: false, erro: 'E-mail e senha são obrigatórios' });
      }

      const resposta = await userModel.buscarUsers(Email);
      if (!resposta || resposta.length === 0) {
        return res
          .status(400)
          .json({ sucesso: false, erro: 'Usuário não encontrado' });
      }

      const usuario = resposta[0];
      const senhaValida = await bcrypt.compare(Senha, usuario.Senha);

      if (!senhaValida) {
        return res
          .status(400)
          .json({ sucesso: false, erro: 'Senha incorreta' });
      }

      const token = gerarToken(usuario);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000, // 1 hora
      });

      return res.status(200).json({ sucesso: true, usuario });
    } catch (erro) {
      console.error('Erro user:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = new UserController();
