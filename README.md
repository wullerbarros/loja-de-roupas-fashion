📖 Documentação Completa da API - Loja de Roupas

A API foi desenvolvida em Node.js + Express e gerencia Produtos, Categorias e Usuários.
Todas as respostas são em JSON.

🔹 Produtos (/api/produtos)
➤ Listar todos os produtos

GET /api/produtos

[
  {
    "id": 1,
    "nome": "Camiseta Polo",
    "preco": 79.90,
    "categoriaId": 2
  },
  {
    "id": 2,
    "nome": "Calça Jeans",
    "preco": 129.90,
    "categoriaId": 1
  }
]

➤ Criar um produto

POST /api/produtos

// Body
{
  "nome": "Tênis Esportivo",
  "preco": 199.90,
  "categoriaId": 3
}

// Resposta
{
  "id": 3,
  "nome": "Tênis Esportivo",
  "preco": 199.90,
  "categoriaId": 3
}

➤ Atualizar um produto

PUT /api/produtos/:id

// Body
{
  "nome": "Tênis Corrida",
  "preco": 219.90,
  "categoriaId": 3
}

// Resposta
{
  "id": 3,
  "nome": "Tênis Corrida",
  "preco": 219.90,
  "categoriaId": 3
}

➤ Excluir produto

DELETE /api/produtos/:id

{ "message": "Produto removido com sucesso." }

🔹 Categorias (/api/categorias)
➤ Listar todas as categorias

GET /api/categorias

[
  { "id": 1, "nome": "Calças" },
  { "id": 2, "nome": "Camisetas" }
]

➤ Criar categoria

POST /api/categorias

// Body
{ "nome": "Tênis" }

// Resposta
{ "id": 3, "nome": "Tênis" }

➤ Atualizar categoria

PUT /api/categorias/:id

// Body
{ "nome": "Calçados" }

// Resposta
{ "id": 3, "nome": "Calçados" }

➤ Excluir categoria

DELETE /api/categorias/:id

{ "message": "Categoria removida com sucesso." }

🔹 Usuários (/api/users)
➤ Listar todos os usuários

GET /api/users

[
  {
    "id": 1,
    "nome": "João da Silva",
    "cpf": "12345678901"
  },
  {
    "id": 2,
    "nome": "Maria Oliveira",
    "cpf": "98765432100"
  }
]

➤ Criar usuário

POST /api/users

// Body
{
  "nome": "Pedro Souza",
  "cpf": "11122233344"
}

// Resposta
{
  "id": 3,
  "nome": "Pedro Souza",
  "cpf": "11122233344"
}


⚠️ Se o CPF já existir:

{ "error": "CPF já cadastrado." }

➤ Atualizar usuário

PUT /api/users/:id

// Body
{
  "nome": "Pedro Almeida",
  "cpf": "11122233344"
}

// Resposta
{
  "id": 3,
  "nome": "Pedro Almeida",
  "cpf": "11122233344"
}

➤ Excluir usuário

DELETE /api/users/:id

{ "message": "Usuário removido com sucesso." }

📌 Resumo das Rotas
Recurso	Método	Rota	Descrição
Produtos	GET	/api/produtos	Listar todos os produtos
Produtos	POST	/api/produtos	Criar novo produto
Produtos	PUT	/api/produtos/:id	Atualizar produto
Produtos	DELETE	/api/produtos/:id	Excluir produto
Categorias	GET	/api/categorias	Listar todas as categorias
Categorias	POST	/api/categorias	Criar nova categoria
Categorias	PUT	/api/categorias/:id	Atualizar categoria
Categorias	DELETE	/api/categorias/:id	Excluir categoria
Usuários	GET	/api/users	Listar todos os usuários
Usuários	POST	/api/users	Criar novo usuário
Usuários	PUT	/api/users/:id	Atualizar usuário
Usuários	DELETE	/api/users/:id	Excluir usuário
