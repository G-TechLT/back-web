const conexao = require('../conexao.js');

class ClienteModel {
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

  listar() {
    const sql = 'SELECT * FROM clientes';
    return this.executaQuery(sql, '');
  }

  listarIdCliente(id) {
    const sql = `SELECT * FROM clientes WHERE id = ${id}`;
    return this.executaQuery(sql, id);
  }

  inserirCliente(novoCliente) {
    const sql = 'INSERT INTO clientes SET ?';
    return this.executaQuery(sql, novoCliente);
  }

  // criar(novoAtendimento) {
  //   const sql = "INSERT INTO atendimentos SET ?";
  //   return this.executaQuery(sql, novoAtendimento);
  // }

  // atualizar(atendimentoAtualizar, id) {
  //   const sql = "UPDATE atendimentos SET ? WHERE id = ?";
  //   return this.executaQuery(sql, [atendimentoAtualizar, id]);
  // }

  // deletar(id) {
  //   const sql = "DELETE FROM atendimentos WHERE id = ?";
  //   return this.executaQuery(sql, id);
  // }
}

module.exports = new ClienteModel();
