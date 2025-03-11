const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const secretKey = "dkjasdhkj32khu4khj32jnksdahf1kjdas";

class UserController {
  async buscarUsers(req, res) {
    const { Email, Senha } = req.body;

    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: "Dados do serviço não fornecidos",
        });
      }

      const resposta = await userModel.buscarUsers(Email, Senha);

      if (resposta == [] || resposta.length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: "Usuário não encontrado",
        });
      }

      const token = jwt.sign(
        { email: resposta.email, id: resposta.id },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .json({ sucesso: true, value: resposta, token: token });
    } catch (erro) {
      console.error("Erro user:", erro);
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
