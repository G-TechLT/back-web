const conexao = require('../conexao.js')

class EquipamentoModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log('Erro na query: ' + error)
          return rej(error)
        }
        return res(results)
      })
    })
  }

  listar() {
    const sql = 'SELECT * FROM equipamentos'
    return this.executaQuery(sql, '')
  }

  listarId(id) {
    const sql = `SELECT * FROM equipamentos where ID = ${id}`
    return this.executaQuery(sql, id)
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

module.exports = new EquipamentoModel()
