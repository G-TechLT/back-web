const conexao = require('../conexao.js');

class VendaModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log('Erro na query AQUI: ' + error);
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

  listar() {
    const sql = `SELECT 
  v.id,
  v.idVenda,
  v.itemVenda,
  v.tipoProduto,
  v.dataProposta,
  v.dataVenda,
  v.status,
  v.marca,
  v.idProduto,
  v.quantidade,
  c.id AS idCliente,
  c.nome AS nomeCliente,
  c.cnpj,
  c.nome_responsavel,
  c.email,
  c.telefone,
  c.endereco,
  c.cidade,
  c.estado,
  c.cep,
  c.data_criacao,
  CASE
    WHEN v.tipoProduto = 'Transmissor' THEN pt.descricaoProduto
    WHEN v.tipoProduto = 'Posicionador' THEN pp.descricaoProduto
    ELSE 'Produto não identificado'
  END AS descricaoProduto,
  COALESCE(pt.nSerieEquipamento, pp.nSerieEquipamento) AS nSerieEquipamento,
  COALESCE(pt.nSerieSensor, '') AS nSerieSensor,
  COALESCE(pt.preco, pp.preco) AS preco
FROM vendas v
LEFT JOIN produto_transmissor pt ON pt.id = v.idProduto AND v.tipoProduto = 'Transmissor'
LEFT JOIN produto_posicionador pp ON pp.id = v.idProduto AND v.tipoProduto = 'Posicionador'
LEFT JOIN clientes c ON c.id = v.idCliente;`;
    return this.executaQuery(sql, '');
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
    `;
    return this.executaQuery(sql, id);
  }

  criarVenda(novaVenda) {
    const sql = 'INSERT INTO vendas SET ?';
    return this.executaQuery(sql, novaVenda);
  }

  attStatus(attVenda, id) {
    const sql = 'UPDATE vendas SET status = ? WHERE idVenda = ?';
    return this.executaQuery(sql, [attVenda, id]);
  }

  listarVendaPeca() {
    const sql = `SELECT 
      v.id,
      v.idVenda,
      v.itemVenda,
      v.tipoProduto,
      v.dataProposta,
      v.dataVenda,
      v.status,
      v.marca,
      v.idProduto,
      v.quantidade,
      c.id AS idCliente,
      c.nome AS nomeCliente,
      c.cnpj,
      c.nome_responsavel,
      c.email,
      c.telefone,
      c.endereco,
      c.cidade,
      c.estado,
      c.cep,
      c.data_criacao,
      p.Descricao AS descricaoProduto,
      p.nSeriePlaca AS nSerieEquipamento,
      p.nSerieSensor AS nSerieSensor,
      p.valorPeca AS preco
    FROM vendas v
    LEFT JOIN pecas p ON p.ID = v.idProduto
    LEFT JOIN clientes c ON c.id = v.idCliente;
    `;
    return this.executaQuery(sql);
  }

  // deletar(id) {
  //   const sql = "DELETE FROM atendimentos WHERE id = ?";
  //   return this.executaQuery(sql, id);
  // }
}

module.exports = new VendaModel();
