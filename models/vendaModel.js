const conexao = require('../conexao.js')

class VendaModel {
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
    const sql = `
      SELECT
    v.id,
    v.idVenda,                           
    c.nome AS nomeCliente,               
    v.itemVenda,                         
    v.tipoProduto,                       
    v.dataProposta,
    v.dataVenda,
    v.status,  
    CASE 
      WHEN v.tipoProduto = '1' THEN pt.descricaoProduto
      WHEN v.tipoProduto = '2' THEN pp.descricaoProduto
      ELSE 'Produto não identificado'
    END AS descricaoProduto,
    CASE 
      WHEN v.tipoProduto = '1' THEN pt.nSerieEquipamento
      WHEN v.tipoProduto = '2' THEN pp.nSerieEquipamento
      ELSE NULL
    END AS nSerieEquipamento,
    CASE 
      WHEN v.tipoProduto = '1' THEN pt.nSerieSensor
      ELSE NULL
    END AS nSerieSensor,
     CASE 
      WHEN v.tipoProduto = '1' THEN pt.preco
      WHEN v.tipoProduto = '2' THEN pp.preco
      ELSE NULL
    END AS preco
    
    FROM vendas v
    JOIN clientes c ON v.idCliente = c.id
    LEFT JOIN produto_transmissor pt ON v.tipoProduto = '1' AND v.idProduto = pt.id
    LEFT JOIN produto_posicionador pp ON v.tipoProduto = '2' AND v.idProduto = pp.id
    ORDER BY v.itemVenda;`
    return this.executaQuery(sql, '')
  }

  listarVendaId(id) {
    const sql = `
      SELECT
        v.id,
        v.idVenda,                           
        c.nome AS nomeCliente,               
        v.itemVenda,                         
        v.tipoProduto,                       
        v.dataProposta,
        v.dataVenda,
        v.status,  
        CASE 
          WHEN v.tipoProduto = '1' THEN pt.descricaoProduto
          WHEN v.tipoProduto = '2' THEN pp.descricaoProduto
          ELSE 'Produto não identificado'
        END AS descricaoProduto,
        CASE 
          WHEN v.tipoProduto = '1' THEN pt.nSerieEquipamento
          WHEN v.tipoProduto = '2' THEN pp.nSerieEquipamento
          ELSE NULL
        END AS nSerieEquipamento
      FROM vendas v
      JOIN clientes c ON v.idCliente = c.id
      LEFT JOIN produto_transmissor pt ON v.tipoProduto = '1' AND v.idProduto = pt.id
      LEFT JOIN produto_posicionador pp ON v.tipoProduto = '2' AND v.idProduto = pp.id
      WHERE v.idVenda = '${id}'
      ORDER BY v.itemVenda;
    `
    return this.executaQuery(sql, id)
  }

  criarVenda(novaVenda) {
    const sql = 'INSERT INTO vendas SET ?'
    return this.executaQuery(sql, novaVenda)
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

module.exports = new VendaModel()
