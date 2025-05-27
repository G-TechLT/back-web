const conexao = require('../conexao');

class DocumentosModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) return rej(error);
        return res(results);
      });
    });
  }

  inserirDocumentos(documentos) {
    const sql = `
      INSERT INTO documentosservico (servico_id, nome_arquivo, caminho_arquivo, tipo_documento)
      VALUES ?
    `;
    return this.executaQuery(sql, [documentos]); // documentos: array de arrays
  }
}

module.exports = new DocumentosModel();
