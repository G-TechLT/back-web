const { Router } = require("express");
const router = Router();
const equipamentoController = require("../controllers/equipamentoController");
const pecasController = require("../controllers/pecasController");
const servicosController = require("../controllers/servicosController");
const pecaServicoController = require("../controllers/pecaServicoController");
const clienteController = require("../controllers/clienteController");

//req = requisição, recebe algo
//res = resposta, envia algo

router.get("/equipamentos", equipamentoController.buscar);

router.get("/equipamentos/:id", equipamentoController.buscarId);

router.get("/pecas/:id", pecasController.pecasPorItemId);

router.get("/pecas", pecasController.allPecas);

router.put("/pecas/:id", pecasController.putMovEstoque);

router.post("/servicos", servicosController.newService);

router.get("/servicos/:id", pecasController.pecaCodService);

router.put("/servicos/:id", pecasController.putCodService);

router.get("/todosServicos", servicosController.buscar);

router.post("/pecaServico", pecaServicoController.newPecaService);

router.get("/clientes/:id", clienteController.buscarClientesId);

router.get("/clientes", clienteController.buscarClientes);

module.exports = router;
