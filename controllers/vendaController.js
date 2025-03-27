const vendaModel = require('../models/vendaModel')

class VencaController {
  // Método para criar um novo serviço
  async buscarTodos(req, res) {
    try {
      const resposta = await vendaModel.listar()
      return res.status(200).json(resposta)
    } catch (erro) {
      console.error('Erro ao buscar clientes:', erro)
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      })
    }
  }

  async buscarClientesId(req, res) {
    const { id } = req.params

    try {
      const resposta = await vendaModel.listarVendaId(id)
      return res.status(200).json(resposta)
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro)
      return res.status(500).json({ sucesso: false, erro: erro.message })
    }
  }
}

module.exports = new VencaController()
