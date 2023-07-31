const produtos = require("../models/bancoDeDados");
const fs = require("fs/promises");
const path = require("path");

const listagemProdutos = async (req, res) => {
  return res.status(200).json(produtos);
};

const cadastrarVendas = async (req, res) => {
  const { produto_id, quantidade } = req.body;

  const produtoEncontrado = produtos.find((produto) => {
    return produto.id === Number(produto_id);
  });

  if (!produtoEncontrado) {
    res.status(404).json({ message: "Produto não foi encontrado" });
  }

  try {
    const vendasFilePath = path.join(__dirname, "../models/vendas.json");
    const vendas = await fs.readFile(vendasFilePath);

    const vendasCadastradas = JSON.parse(vendas);

    vendasCadastradas.vendas.push({
      produto: produtoEncontrado,
      quantidade,
    });

    await fs.writeFile(vendasFilePath, JSON.stringify(vendasCadastradas));

    return res.status(201).json({ message: "Vendas cadastrada com sucesso" });
  } catch (erro) {
    return res.status(500).json(`deu error: ${erro.message}`);
  }
};

module.exports = { cadastrarVendas, listagemProdutos };
