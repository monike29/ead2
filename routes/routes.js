const express = require("express")
const controller = require("../controllers/controllerCliente")

const routes = express.Router()

routes.get("/", controller.listarTodos)
routes.get("/:id", controller.buscarporId)
routes.get("/:cidade", controller.buscarPorCidade)
routes.post("/", controller.criar)
routes.put("/:id", controller.atualizar)
routes.delete("/:id", controller.excluir)

module.exports = routes