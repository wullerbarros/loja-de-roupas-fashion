import express from "express";
import {
  createProduto,
  getProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto,
} from "../controllers/produtoController.js";

const router = express.Router();

router.post("/", createProduto);
router.get("/", getProdutos);
router.get("/:id", getProdutoById);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto);

export default router;
