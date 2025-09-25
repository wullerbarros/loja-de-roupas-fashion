import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Helper: campos públicos (sem senha)
const publicUserSelect = {
  id_usuario: true,
  nome: true,
  cargo: true,
  cpf: true,
  email: true,
  data_cadastro: true,
  ativo: true,
};

// ============================
// POST /api/users  (Create)
// ============================
router.post("/", async (req, res) => {
  try {
    const { nome, cargo, cpf, email, senha, ativo } = req.body;

    if (!nome || !cpf || !email || !senha) {
      return res.status(400).json({
        error: "Campos obrigatórios: nome, cpf, email, senha.",
      });
    }

    const usuario = await prisma.usuarios.create({
      data: {
        nome,
        cargo: cargo ?? null,
        cpf,
        email,
        senha,
        ...(typeof ativo === "boolean" ? { ativo } : {}),
      },
      select: publicUserSelect,
    });

    res.status(201).json(usuario);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error:
          error.meta?.target?.includes("email")
            ? "E-mail já cadastrado."
            : "CPF já cadastrado.",
      });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// ============================
// GET /api/users  (Read - listar)
// ============================
router.get("/", async (_req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: publicUserSelect,
      orderBy: { id_usuario: "asc" },
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// ============================
// GET /api/users/:id  (Read - por id)
// ============================
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: id },
      select: publicUserSelect,
    });

    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado." });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// ============================
// PUT /api/users/:id  (Update)
// ============================
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const { nome, cargo, cpf, email, senha, ativo } = req.body;

    const data = {};
    if (typeof nome === "string") data.nome = nome;
    if (cargo === null || typeof cargo === "string") data.cargo = cargo ?? null;
    if (typeof cpf === "string") data.cpf = cpf;
    if (typeof email === "string") data.email = email;
    if (typeof senha === "string") data.senha = senha;
    if (typeof ativo === "boolean") data.ativo = ativo;

    const usuario = await prisma.usuarios.update({
      where: { id_usuario: id },
      data,
      select: publicUserSelect,
    });

    res.json(usuario);
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "E-mail ou CPF já cadastrado em outro usuário." });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// ============================
// DELETE /api/users/:id  (Delete)
// ============================
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    await prisma.usuarios.delete({
      where: { id_usuario: id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

// Export default para ES Modules
export default router;