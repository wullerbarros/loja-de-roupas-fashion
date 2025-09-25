import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ============================
// Criar categoria
// POST /api/categorias
// ============================
router.post("/", async (req, res) => {
  try {
    const { nome_categoria } = req.body;

    const categoria = await prisma.categorias.create({
      data: { nome_categoria },
    });

    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar categoria" });
  }
});

// ============================
// Listar todas categorias
// GET /api/categorias
// ============================
router.get("/", async (_req, res) => {
  try {
    const categorias = await prisma.categorias.findMany();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao buscar categorias" });
  }
});

// ============================
// Buscar categoria por ID
// GET /api/categorias/:id
// ============================
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const categoria = await prisma.categorias.findUnique({
      where: { id_categoria: id },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao buscar categoria" });
  }
});

// ============================
// Atualizar categoria
// PUT /api/categorias/:id
// ============================
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome_categoria } = req.body;

    const categoria = await prisma.categorias.update({
      where: { id_categoria: id },
      data: { nome_categoria },
    });

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao atualizar categoria" });
  }
});

// ============================
// Deletar categoria
// DELETE /api/categorias/:id
// ============================
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.categorias.delete({
      where: { id_categoria: id },
    });

    res.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao deletar categoria" });
  }
});

// ============================
// Listar produtos de uma categoria
// GET /api/categorias/:id/produtos
// ============================
router.get("/:id/produtos", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const produtos = await prisma.produtos.findMany({
      where: { id_categoria: id },
    });

    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao buscar produtos da categoria" });
  }
});

// Export default para ES Modules
export default router;