const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const secretKey = "dkjasdhkj32khu4khj32jnksdahf1kjdas";

class UserController {
  async buscar(req, res) {
    try {
      const resposta = await userModel.buscarUsers(req.body.email);

      if (!resposta) {
        return res
          .status(404)
          .json({ sucesso: false, mensagem: "Usuário não encontrado" });
      }

      // Generate JWT
      const token = jwt.sign(
        { email: resposta.email, id: resposta.id },
        secretKey,
        {
          expiresIn: "1h", // Token expiration time
        }
      );

      return res.status(200).json({ sucesso: true, value: resposta, token });
    } catch (erro) {
      console.error("Erro ao buscar equipamento:", erro);
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
