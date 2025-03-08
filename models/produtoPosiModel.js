const conexao = require("../conexao.js");

class ProdPosiModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log("Erro na query: " + error);
          return rej(error);
        }
        return res(results);
      });
    });
  }

  listar() {
    const sql = "SELECT * FROM produtos_posicionador";
    return this.executaQuery(sql, "");
  }

  criar(novoProduto) {
    const sql = "INSERT INTO produto_posicionador SET ?";
    return this.executaQuery(sql, novoProduto);
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

module.exports = new ProdPosiModel();
