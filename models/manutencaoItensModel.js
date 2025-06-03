const conexao = require('../conexao.js');

class ManutencaoItensModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log('Erro na query: ' + error);
          return rej(error);
        }
        return res(results);
      });
    });
  }

  inserirItens(itens) {
    const sql = `
      INSERT INTO manutencaoItens
      (servico_id, equipamento_id, descricao, modelo, numero_serie, numero_sensor, patrimonio, tag, acompanha_laudo)
      VALUES ?
    `;

    const values = itens.map((item) => [
      item.servico_id,
      item.equipamento_id || null,
      item.descricao || null,
      item.modelo || null,
      item.numero_serie || null,
      item.numero_sensor || null,
      item.patrimonio || null,
      item.tag || null,
      item.acompanha_laudo || null,
    ]);

    return this.executaQuery(sql, [values]);
  }

  listarTodos() {
    const sql = `SELECT * FROM manutencaoItens ORDER BY id DESC`;
    return this.executaQuery(sql);
  }

  listarPorServicoId(servico_id) {
    const sql = `SELECT * FROM manutencaoItens WHERE servico_id = ? ORDER BY id ASC`;
    return this.executaQuery(sql, [servico_id]);
  }

  deletarItem(id) {
    const sql = `DELETE FROM manutencaoItens WHERE id = ?`;
    return this.executaQuery(sql, [id]);
  }

  atualizarItem(id, data) {
    const sql = `
      UPDATE manutencaoItens SET 
        descricao = ?, 
        modelo = ?, 
        numero_serie = ?, 
        numero_sensor = ?, 
        patrimonio = ?, 
        tag = ?, 
        acompanha_laudo = ?
      WHERE id = ?
    `;

    const parametros = [
      data.descricao || null,
      data.modelo || null,
      data.numero_serie || null,
      data.numero_sensor || null,
      data.patrimonio || null,
      data.tag || null,
      data.acompanha_laudo ? 1 : 0,
      id,
    ];

    return this.executaQuery(sql, parametros);
  }
}

module.exports = new ManutencaoItensModel();
