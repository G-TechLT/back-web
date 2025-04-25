const pecasModel = require('../models/pecasModel.js');

class PecasController {
  async pecasPorItemId(req, res) {
    const { id } = req.params;

    try {
      const resposta = await pecasModel.filtrarPecaItemId(id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async allPecas(req, res) {
    try {
      const resposta = await pecasModel.allPecas();
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar pecas na rota /pecas:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async criarPeca(req, res) {
    const newPeca = req.body;
    try {
      const resposta = await pecasModel.criar(newPeca);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar pecas na rota /pecas:', erro);
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
      console.error('Erro ao buscar pecas na rota /pecas:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async pecaCodService(req, res) {
    const { id } = req.params;

    try {
      const resposta = await pecasModel.filtrarPecaCodService(id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async putCodService(req, res) {
    const { id } = req.params;
    const serviceAtt = req.body;

    try {
      const columnName = Object.keys(serviceAtt)[0];
      const newValue = Object.values(serviceAtt)[0];

      const resposta = await pecasModel.putCodService(columnName, newValue, id);

      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao atualizar atendimento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = new PecasController();
