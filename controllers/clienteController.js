const clienteModel = require('../models/clienteModel.js');

class ClienteController {
  // Método para criar um novo serviço
  async buscarClientes(req, res) {
    try {
      const resposta = await clienteModel.listar();

      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar clientes:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async criarCliente(req, res) {
    try {
      const dados = req.body;

      const resposta = await clienteModel.inserirCliente(dados);

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Cliente cadastrado com sucesso',
        dados: resposta,
      });
    } catch (erro) {
      console.error('Erro ao criar cliente:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async buscarClientesId(req, res) {
    const { id } = req.params;

    try {
      const resposta = await clienteModel.listarIdCliente(id);
      return res.status(200).json(resposta[0]);
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = new ClienteController();
