const conexao = require("../conexao.js");

class PecaServModel {
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

  //   filtrarPecaItemId(id) {
  //     const sql = "SELECT * FROM Pecas WHERE ItemId = ?";

  //     return this.executaQuery(sql, id);
  //   }

  criarServico(novoAtendimento) {
    const sql = "INSERT INTO servicos_pecas SET ?";
    return this.executaQuery(sql, novoAtendimento);
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

module.exports = new PecaServModel();
