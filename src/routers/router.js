const express = require("express");
const rotas = express();
const {
  listagemProdutos,
  cadastrarVendas,
} = require("../controllers/vendasController");

rotas.get("/produtos", listagemProdutos);
rotas.post("/produtos", cadastrarVendas);

module.exports = rotas;
