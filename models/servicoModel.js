const conexao = require('../conexao.js')

class ServicoModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log('Erro na query AQUI: ' + error)
          return rej(error)
        }
        return res(results)
      })
    })
  }

  //   filtrarPecaItemId(id) {
  //     const sql = "SELECT * FROM Pecas WHERE ItemId = ?";

  //     return this.executaQuery(sql, id);
  //   }

  listar() {
    const sql = 'SELECT * FROM servicos'
    return this.executaQuery(sql, '')
  }

  criarServico(novoServico) {
    const sql = 'INSERT INTO servicos SET ?'
    return this.executaQuery(sql, novoServico)
  }

  serviceCodService(codService) {
    const sql = 'SELECT * FROM servicos WHERE codService = ?'
    return this.executaQuery(sql, codService)
  }

  // atualizar(atendimentoAtualizar, id) {
  //   const sql = "UPDATE atendimentos SET ? WHERE id = ?";
  //   return this.executaQuery(sql, [atendimentoAtualizar, id]);
  // }

  // deletar(id) {
  //   const sql = "DELETE FROM atendimentos WHERE id = ?";
  //   return this.executaQuery(sql, id);
  // }
}

module.exports = new ServicoModel()
