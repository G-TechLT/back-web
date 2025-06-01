const manutencaoItensModel = require('../models/manutencaoItensModel');

class ManutencaoItensController {
  async inserirItens(req, res) {
    try {
      const { id } = req.params;
      const itens = req.body.itens;

      if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ message: 'Nenhum item enviado.' });
      }

      const dados = itens.map((item) => ({
        servico_id: id,
        descricao: item.descricao,
        modelo: item.modelo,
        numero_serie: item.numero_serie,
        numero_sensor: item.numero_sensor,
        patrimonio: item.patrimonio,
        tag: item.tag,
        acompanha_laudo: item.acompanha_laudo,
      }));

      const resultado = await manutencaoItensModel.inserirItens(dados);
      return res
        .status(201)
        .json({ message: 'Itens inseridos com sucesso!', resultado });
    } catch (error) {
      console.error('Erro ao inserir itens:', error);
      return res
        .status(500)
        .json({ message: 'Erro interno ao inserir itens.' });
    }
  }

  async listarTodos(req, res) {
    try {
      const resultado = await manutencaoItensModel.listarTodos();
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar os itens.' });
    }
  }

  async listarPorServicoId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await manutencaoItensModel.listarPorServicoId(id);
      return res.status(200).json(resultado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao buscar itens por serviço_id.' });
    }
  }

  async deletarItem(req, res) {
    try {
      const { id } = req.params;
      await manutencaoItensModel.deletarItem(id);
      return res.status(200).json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar item.' });
    }
  }

  async atualizarItem(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const resultado = await manutencaoItensModel.atualizarItem(id, dados);
      return res
        .status(200)
        .json({ message: 'Item atualizado com sucesso.', resultado });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar item.' });
    }
  }
}

module.exports = new ManutencaoItensController();
