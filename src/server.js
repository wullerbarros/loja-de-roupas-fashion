import express from "express";
import dotenv from "dotenv";

// Import das rotas
import userRoutes from "./routes/userRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando! Bem-vindo à API da Loja Fashion.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
