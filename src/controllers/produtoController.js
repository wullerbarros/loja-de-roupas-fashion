import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduto = async (req, res) => {
  try {
    let { nome, tamanho, cor, preco, estoque, id_categoria, categoria } = req.body;

    if (categoria && !id_categoria) {
      const cat = await prisma.categorias.findFirst({ where: { nome: categoria } });
      if (!cat) return res.status(400).json({ error: `Categoria '${categoria}' não existe.` });
      id_categoria = cat.id_categoria;
    }

    const produto = await prisma.produtos.create({
      data: { nome, tamanho, cor, preco, estoque, id_categoria },
    });

    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produtos.findMany({ include: { categorias: true } });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produtos.findUnique({
      where: { id: parseInt(id) },
      include: { categorias: true },
    });
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, tamanho, cor, preco, estoque, categoria } = req.body;

  try {
    let categoriaDb;
    if (categoria) {
      categoriaDb = await prisma.categorias.findFirst({ where: { nome: categoria } });
      if (!categoriaDb) {
        categoriaDb = await prisma.categorias.create({ data: { nome: categoria } });
      }
    }

    const produto = await prisma.produtos.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        tamanho,
        cor,
        preco,
        estoque,
        id_categoria: categoriaDb ? categoriaDb.id_categoria : undefined,
      },
    });

    res.json(produto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.produtos.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};