const equipamentoModel = require('../models/equipamentoModel.js')

class EquipamentoController {
  async buscar(req, res) {
    try {
      const resposta = await equipamentoModel.listar()
      return res.status(200).json(resposta)
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro)
      return res.status(500).json({ sucesso: false, erro: erro.message })
    }
  }

  async buscarId(req, res) {
    const { id } = req.params

    try {
      const resposta = await equipamentoModel.listarId(id)
      return res.status(200).json(resposta[0])
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro)
      return res.status(500).json({ sucesso: false, erro: erro.message })
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

module.exports = new EquipamentoController()
