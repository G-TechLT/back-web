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

  // 🧾 Inserir nova O.S.
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

  // 📋 Buscar todas as O.S.
  listarServicos() {
    const sql = `SELECT * FROM manutencaoServico ORDER BY id DESC`;
    return this.executaQuery(sql);
  }

  // 🔍 Buscar O.S. por ID
  buscarPorId(id) {
    const sql = `SELECT * FROM manutencaoServico WHERE id = ?`;
    return this.executaQuery(sql, [id]);
  }

  // ❌ Deletar O.S.
  deletarServico(id) {
    const sql = `DELETE FROM manutencaoServico WHERE id = ?`;
    return this.executaQuery(sql, [id]);
  }
}

module.exports = new ServicoManuModel();
