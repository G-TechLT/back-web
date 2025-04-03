const servicoModel = require('../models/servicoModel.js');

class ServicoController {
  // Método para criar um novo serviço
  async newService(req, res) {
    try {
      // Validação básica dos dados recebidos
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Dados do serviço não fornecidos',
        });
      }

      const resposta = await servicoModel.criarServico(req.body);

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Serviço criado com sucesso',
        dados: resposta,
      });
    } catch (erro) {
      console.error('Erro ao criar serviço AQUI:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  async buscar(req, res) {
    try {
      const resposta = await servicoModel.listar();
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  async buscarCodService(req, res) {
    const { id } = req.params;

    try {
      const resposta = await servicoModel.serviceCodService(id);
      return res.status(200).json(resposta);
    } catch (erro) {
      console.error('Erro ao buscar equipamento:', erro);
      return res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = new ServicoController();
