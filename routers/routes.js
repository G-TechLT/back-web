const { Router } = require('express');
const router = Router();
const equipamentoController = require('../controllers/equipamentoController');
const pecasController = require('../controllers/pecasController');
const servicosController = require('../controllers/servicosController');
const prodTransmissor = require('../controllers/produtoTransmController');
const prodPosi = require('../controllers/produtoPosiController');
const pecaServicoController = require('../controllers/pecaServicoController');
const clienteController = require('../controllers/clienteController');
const userController = require('../controllers/userController');
const vendaController = require('../controllers/vendaController');
const servicoManutencaoController = require('../controllers/servicoManutencaoController');
const upload = require('../middlewares/upload');
const manutencaoItensControlle = require('../controllers/manutencaoItensControlle');

//req = requisição, recebe algo
//res = resposta, envia algo

router.get('/equipamentos', equipamentoController.buscar);

router.get('/equipamentos/:id', equipamentoController.buscarId);

router.get('/pecas/:id', pecasController.pecasPorItemId);

router.get('/pecas', pecasController.allPecas);

router.put('/pecas/:id', pecasController.putMovEstoque);

router.post('/servicos', servicosController.newService);

router.post('/usuarios/login', userController.buscarUsers);
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({ sucesso: true, mensagem: 'Logout efetuado' });
});

router.post('/novasPecas', pecasController.criarPeca);

router.get('/servicos/:id', pecasController.pecaCodService);

router.get('/servicosCodService/:id', servicosController.buscarCodService);

router.put('/servicos/:id', pecasController.putCodService);

router.get('/todosServicos', servicosController.buscar);

router.post('/pecaServico', pecaServicoController.newPecaService);

router.get('/clientes/:id', clienteController.buscarClientesId);

router.get('/clientes', clienteController.buscarClientes);

router.post('/novoCliente', clienteController.criarCliente);

router.post('/prodTransmissor', prodTransmissor.novoProd);

router.get('/produtosTransmissor', prodTransmissor.buscarProdTransmissor);

router.put('/qtdProdutosTransmissor/:id', prodTransmissor.confirmarVenda);

router.put('/novaVenda/:id', prodTransmissor.putPrdTrm);

router.put('/attStatus/:id', vendaController.attStatus);

router.get('/produtosPosicionador', prodPosi.buscarPosicionador);

router.post('/prodPosicionador', prodPosi.novoProd);

router.get('/todasVendas', vendaController.buscarTodos);

router.get('/todasVendasPecas', vendaController.buscarVendaPeca);

router.get('/todasVendasHoje', vendaController.buscarVendasHoje);

router.post('/novaVenda', vendaController.newVenda);

router.get('/vendas/:id', vendaController.buscarClientesId);

router.post(
  '/servicoManutencao',
  upload.array('anexo_doc'),
  servicoManutencaoController.criarServico
);

router.post('/manutencao/:id/itensOs', manutencaoItensControlle.inserirItens);

router.get('/manutencao/itens', manutencaoItensControlle.listarTodos);

router.get(
  '/manutencao/:id/itensOs',
  manutencaoItensControlle.listarPorServicoId
);

router.delete('/manutencao/itens/:id', manutencaoItensControlle.deletarItem);

router.put('/manutencao/itens/:id', manutencaoItensControlle.atualizarItem);

module.exports = router;
