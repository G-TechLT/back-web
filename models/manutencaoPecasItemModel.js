const conexao = require('../conexao.js');

class ManutencaoPecasItemModel {
  executaQuery(sql, parametros) {
    return new Promise((resolve, reject) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log('Erro na query:', error);
          return reject(error);
        }
        return resolve(results);
      });
    });
  }

  inserirPecas(itens) {
    const sql = `
      INSERT INTO manutencao_pecas_item
      (item_id, peca_id, manutencao_id, quantidade, acao, observacao)
      VALUES ?
    `;

    const values = itens.map((item) => [
      item.item_id,
      item.peca_id,
      item.manutencao_id,
      item.quantidade,
      item.acao,
      item.observacao || null,
    ]);

    return this.executaQuery(sql, [values]);
  }

  listarPorItem(item_id) {
    const sql = `
      SELECT mpi.*, p.Descricao AS nome_peca
      FROM manutencao_pecas_item mpi
      JOIN pecas p ON mpi.peca_id = p.ID
      WHERE mpi.item_id = ?
    `;
    return this.executaQuery(sql, [item_id]);
  }

  deletar(id) {
    const sql = `DELETE FROM manutencao_pecas_item WHERE id = ?`;
    return this.executaQuery(sql, [id]);
  }
}

module.exports = new ManutencaoPecasItemModel();
