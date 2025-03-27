const produtoTransmModel = require('../models/produtoTransmModel.js')
const prodTransmModel = require('../models/produtoTransmModel.js')

class ProdTransmController {
  // Método para criar um novo serviço
  async novoProd(req, res) {
    try {
      // Validação básica dos dados recebidos
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Dados do serviço não fornecidos',
        })
      }

      const resposta = await prodTransmModel.criar(req.body)

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Serviço criado com sucesso',
        dados: resposta,
      })
    } catch (erro) {
      console.error('Erro ao criar serviço:', erro)
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      })
    }
  }

  async buscarProdTransmissor(req, res) {
    try {
      const resposta = await produtoTransmModel.listar()
      return res.status(200).json(resposta)
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro)
      return res.status(500).json({ sucesso: false, erro: erro.message })
    }
  }

  async putPrdTrm(req, res) {
    const { id } = req.params

    try {
      const updates = req.body

      // Percorre cada par chave-valor do objeto enviado no body
      for (const [column, newValue] of Object.entries(updates)) {
        // Chama o model para atualizar o campo específico no banco de dados
        await produtoTransmModel.putPrdTrm(column, newValue, id)
      }

      return res.status(200).json({ sucesso: true })
    } catch (erro) {
      console.error('Erro ao atualizar o equipamento:', erro)
      return res.status(500).json({ sucesso: false, erro: erro.message })
    }
  }
}

module.exports = new ProdTransmController()
