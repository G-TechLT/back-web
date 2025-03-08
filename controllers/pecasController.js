const pecasModel = require("../models/pecasModel.js");

class PecasController {
  // Método para buscar uma peça pelo ID
  async pecasPorItemId(req, res) {
    const { id } = req.params;

    try {
      const resposta = await pecasModel.filtrarPecaItemId(id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error("Erro ao buscar equipamento:", erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async allPecas(req, res) {
    try {
      const resposta = await pecasModel.allPecas();
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error("Erro ao buscar pecas na rota /pecas:", erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async criarPeca(req, res) {
    const newPeca = req.body;
    try {
      const resposta = await pecasModel.criar(newPeca);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error("Erro ao buscar pecas na rota /pecas:", erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async putMovEstoque(req, res) {
    const { id } = req.params;
    const newQtd = req.body;

    try {
      const resposta = await pecasModel.putMovEstoque(newQtd, id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error("Erro ao buscar pecas na rota /pecas:", erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async pecaCodService(req, res) {
    const { id } = req.params;

    try {
      const resposta = await pecasModel.filtrarPecaCodService(id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error("Erro ao buscar equipamento:", erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async putCodService(req, res) {
    const { id } = req.params;
    const serviceAtt = req.body; // Corrected from 'serticeAtt' to 'serviceAtt'

    console.log(serviceAtt); // Expected output: {status: "Concluído"}

    try {
      // Assuming 'serviceAtt' is an object with a single key-value pair
      const columnName = Object.keys(serviceAtt)[0]; // e.g., 'status'
      const newValue = Object.values(serviceAtt)[0]; // e.g., 'Concluído'

      // Call the SQL query function with dynamic column and value
      const resposta = await pecasModel.putCodService(columnName, newValue, id);

      return res.status(200).json(resposta);
    } catch (erro) {
      console.error("Erro ao atualizar atendimento:", erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = new PecasController();
