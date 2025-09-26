# 🛒 Loja - Back-End (Node.js + Express + Prisma)

Este é o back-end de uma aplicação de loja, desenvolvido em **Node.js** com **Express** e **Prisma ORM** para persistência de dados.  
O projeto oferece rotas REST para gerenciar **produtos**, **categorias** e **usuários**.

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite ou PostgreSQL] (dependendo do banco configurado no `schema.prisma`)

---

## 📦 Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/wullerbarros/loja-backend.git
cd loja-backend

2. Instalar dependências
npm install

3. Configurar o Prisma

Editar o arquivo .env com a URL do banco:
DATABASE_URL="file:./dev.db"
Rodar as migrations:
npx prisma migrate dev --name init

4. Rodar o servidor
npm run dev
O servidor iniciará em:
👉 http://localhost:3000

📚 Rotas Disponíveis
Produtos

GET /api/produtos → Lista todos os produtos

GET /api/produtos/:id → Retorna um produto pelo ID

POST /api/produtos → Cria um novo produto

{
  "nome": "Camiseta",
  "preco": 59.90,
  "id_categoria": 1
}

PUT /api/produtos/:id → Atualiza um produto existente

DELETE /api/produtos/:id → Remove um produto


Categorias

GET /api/categorias → Lista todas as categorias

GET /api/categorias/:id → Retorna uma categoria pelo ID

POST /api/categorias → Cria uma nova categoria
{
  "nome_categoria": "Roupas"
}

PUT /api/categorias/:id → Atualiza uma categoria

DELETE /api/categorias/:id → Remove uma categoria

Usuários

GET /api/users → Lista todos os usuários

GET /api/users/:id → Retorna um usuário pelo ID

POST /api/users → Cria um novo usuário

{
  "nome": "Maria",
  "email": "maria@email.com",
  "cpf": "12345678901"
}

PUT /api/users/:id → Atualiza um usuário existente

DELETE /api/users/:id → Remove um usuário














