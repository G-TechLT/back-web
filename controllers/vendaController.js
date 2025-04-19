const vendaModel = require('../models/vendaModel');

class VendaController {
  // Método para criar um novo serviço
  async buscarTodos(req, res) {
    try {
      const resposta = await vendaModel.listar();
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar clientes:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async buscarVendaPeca(req, res) {
    try {
      const resposta = await vendaModel.listarVendaPeca();
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar clientes:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async buscarVendasHoje(req, res) {
    try {
      const resposta = await vendaModel.listarVendasHoje();
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar clientes:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async buscarClientesId(req, res) {
    const { id } = req.params;

    try {
      const resposta = await vendaModel.listarVendaId(id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async attStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      // console.log(id, status)
      const resposta = await vendaModel.attStatus(status, id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao atualizar status:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async newVenda(req, res) {
    try {
      const vendas = req.body;

      if (!Array.isArray(vendas) || vendas.length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Envie um array de vendas com pelo menos um item.',
        });
      }

      const resultados = [];

      for (const venda of vendas) {
        const resposta = await vendaModel.criarVenda(venda);
        resultados.push(resposta);
      }

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Todas as vendas foram inseridas com sucesso',
        dados: resultados,
      });
    } catch (erro) {
      console.error('Erro ao criar vendas:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }
}

module.exports = new VendaController();
