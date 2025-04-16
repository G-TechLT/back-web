const conexao = require('../conexao.js');

class ServicosModel {
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

  filtrarPecaItemId(id) {
    const sql = `SELECT * FROM pecas WHERE ItemId = ${id}`;
    return this.executaQuery(sql, id);
  }

  allPecas() {
    const sql = `SELECT * FROM pecas`;
    return this.executaQuery(sql, '');
  }

  filtrarPecaCodService(id) {
    const sql = `SELECT
      sp.id AS servico_peca_id,
      sp.codService,
      sp.quantidade_peca,
      sp.servico_id,
      sp.idCliente,
      sp.insVisual,
      sp.manuPreventiva,
      sp.manuPrevTomada,
      sp.itemService,
      
      -- Equipamento
      e.ID AS equipamento_id,
      e.ItemID AS equipamento_ItemID,
      e.Descricao AS equipamento_Descricao,
      e.Categoria,
      e.DataCadastro AS equipamento_DataCadastro,
      e.Modelo AS equipamento_Modelo,

      -- Peça
      p.ID AS peca_id,
      p.ItemID AS peca_ItemID,
      p.Carcaca,
      p.Visor,
      p.NumeroItem,
      p.Quantidade AS peca_Quantidade,
      p.Descricao AS peca_Descricao,
      p.Codigo,
      p.Observacao,
      p.DataCadastro AS peca_DataCadastro,
      p.valorPeca,
      p.nSeriePlaca,
      p.protocolo,
      p.nSerieSensor,
      p.faixaSensor,
      p.dataFabricacao,
      p.modeloPlaca

    FROM servicos_pecas sp
    LEFT JOIN equipamentos e ON sp.equipamentoId = e.ID
    LEFT JOIN pecas p ON sp.peca_id = p.ID
    WHERE sp.codService = '${id}'`;
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
    const sql = 'INSERT INTO pecas SET ?';
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
