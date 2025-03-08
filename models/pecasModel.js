const conexao = require("../conexao.js");

class ServicosModel {
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

  filtrarPecaItemId(id) {
    const sql = `SELECT * FROM Pecas WHERE ItemId = ${id}`;
    return this.executaQuery(sql, id);
  }

  allPecas() {
    const sql = `SELECT * FROM Pecas`;
    return this.executaQuery(sql, "");
  }

  filtrarPecaCodService(id) {
    const sql = `SELECT 
        sp.codService,
        sp.peca_id,
        sp.quantidade_peca,
        sp.idCliente,
        p.ItemID,
        p.Carcaca,
        p.Visor,
        p.Quantidade,
        p.Descricao,
        p.valorPeca,
        s.modelo,
        s.categoria
    FROM
        servicos_pecas sp
            JOIN
        pecas p ON sp.peca_id = p.ID
            JOIN
        servicos s ON sp.codService = s.codService
    WHERE
        sp.codService = '${id}'`;
    return this.executaQuery(sql, id);
  }

  putCodService(serviceAtt, newValue, id) {
    const sql = `UPDATE servicos SET ?? = ? WHERE codService = ?`;
    return this.executaQuery(sql, [serviceAtt, newValue, id]);
  }

  putMovEstoque(newValue, id) {
    const sql = `UPDATE pecas SET Quantidade = ? WHERE ID = ?`;
    return this.executaQuery(sql, [newValue, id]);
  }

  criar(novaPecas) {
    const sql = "INSERT INTO pecas SET ?";
    return this.executaQuery(sql, novaPecas);
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

module.exports = new ServicosModel();
