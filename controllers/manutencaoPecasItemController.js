const manutencaoPecasItemModel = require('../models/manutencaoPecasItemModel');

class ManutencaoPecasItemController {
  async inserir(req, res) {
    try {
      const itens = req.body.itens;

      if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ message: 'Nenhuma peça enviada.' });
      }

      const validacoes = itens.every(
        (item) =>
          item.item_id &&
          item.peca_id &&
          item.quantidade &&
          ['instalacao', 'substituicao', 'retirada'].includes(item.acao)
      );

      if (!validacoes) {
        return res.status(400).json({ message: 'Dados inválidos nos itens.' });
      }

      const resultado = await manutencaoPecasItemModel.inserirPecas(itens);
      return res
        .status(201)
        .json({ message: 'Peças inseridas com sucesso.', resultado });
    } catch (error) {
      console.error('Erro ao inserir peças:', error);
      return res
        .status(500)
        .json({ message: 'Erro interno ao inserir peças.' });
    }
  }

  async listarPorItem(req, res) {
    try {
      const { item_id } = req.params;
      const resultado = await manutencaoPecasItemModel.listarPorItem(item_id);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar peças do item.' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await manutencaoPecasItemModel.deletar(id);
      return res.status(200).json({ message: 'Peça removida com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao remover peça.' });
    }
  }
}

module.exports = new ManutencaoPecasItemController();
