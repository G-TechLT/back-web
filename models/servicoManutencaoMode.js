const conexao = require('../conexao.js');

class ServicoManuModel {
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

  inserirServico(data) {
    const sql = `
      INSERT INTO manutencaoServico 
      (data_abertura, tipo_servico, cliente_id, anexo_doc, status_atual) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const parametros = [
      data.data_abertura,
      data.tipo_servico,
      data.cliente_id,
      data.anexo_doc || null,
      'Aberto', // status padrão
    ];
    return this.executaQuery(sql, parametros);
  }

  listarServicos() {
    const sql = `SELECT * FROM manutencaoServico ORDER BY id DESC`;
    return this.executaQuery(sql);
  }

  buscarPorId(id) {
    const sql = `SELECT * FROM manutencaoServico WHERE id = ?`;
    return this.executaQuery(sql, [id]);
  }

  deletarServico(id) {
    const sql = `DELETE FROM manutencaoServico WHERE id = ?`;
    return this.executaQuery(sql, [id]);
  }

  editarServico(data, id) {
    const sql = `
    UPDATE manutencaoServico SET
      data_abertura = ?,
      tipo_servico = ?,
      cliente_id = ?,
      referencia = ?,
      acompanha_laudo = ?,
      anexo_doc = ?,
      nf = ?,
      romaneio = ?,
      outros_documentos = ?,
      status_atual = ?,
      valor_final = ?
    WHERE id = ?
  `;

    const parametros = [
      data.data_abertura,
      data.tipo_servico,
      data.cliente_id,
      data.referencia || null,
      data.acompanha_laudo ?? false,
      data.anexo_doc || null,
      data.nf || null,
      data.romaneio || null,
      data.outros_documentos || null,
      data.status_atual || 'Aberto',
      data.valor_final || null,
      id,
    ];

    return this.executaQuery(sql, parametros);
  }
}

module.exports = new ServicoManuModel();
