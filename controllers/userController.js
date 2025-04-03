const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'dkjasdhkj32khu4khj32jnksdahf1kjdas';

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
        return res.status(400).json({
          sucesso: false,
          erro: 'Usuário não encontrado',
        });
      }

      const usuario = resposta[0];

      const senhaValida = await bcrypt.compare(Senha, usuario.Senha);

      if (!senhaValida) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Senha incorreta',
        });
      }

      const token = jwt.sign(
        { Email: usuario.Email, id: usuario.ID },
        secretKey,
        {
          expiresIn: '1h',
        }
      );

      return res.status(200).json({ sucesso: true, usuario, token });
    } catch (erro) {
      console.error('Erro user:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  // async criar(req, res) {
  //   try {
  //     const resposta = await equipamentoModel.criar(req.body);
  //     return res.status(201).json(resposta);
  //   } catch (erro) {
  //     console.error("Erro ao criar atendimento:", erro);
  //     return res.status(500).json({ sucesso: false, erro: erro.message });
  //   }
  // }

  // async deletar(req, res) {
  //   const { id } = req.params;

  //   try {
  //     const resposta = await equipamentoModel.deletar(id);
  //     return res.status(202).json(resposta);
  //   } catch (erro) {
  //     console.error("Erro ao deletar atendimento:", erro);
  //     return res.status(500).json({ sucesso: false, erro: erro.message });
  //   }
  // }
}

module.exports = new UserController();
