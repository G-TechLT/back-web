const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Adicione esta importação no topo

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

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.ID, email: usuario.Email },
        process.env.JWT_SECRET, // Use uma variável de ambiente segura no backend
        { expiresIn: '1h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Só envia via HTTPS em produção
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Use 'none' em produção se cross-origin
        maxAge: 3600000, // 1 hora em milissegundos
        path: '/', // Disponível em todo o site
      });

      return res.status(200).json({
        sucesso: true,
        usuario,
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
