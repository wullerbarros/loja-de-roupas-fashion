-- CreateTable
CREATE TABLE "public"."categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nome_categoria" VARCHAR(100) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."item_vendas" (
    "id_item_vendas" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL(10,2) NOT NULL,
    "valor_total_produto" DECIMAL(10,2),
    "id_venda" INTEGER,
    "id_produto" INTEGER,

    CONSTRAINT "item_vendas_pkey" PRIMARY KEY ("id_item_vendas")
);

-- CreateTable
CREATE TABLE "public"."produtos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tamanho" VARCHAR(50),
    "cor" VARCHAR(50),
    "preco" DECIMAL(10,2) NOT NULL,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "id_categoria" INTEGER,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cargo" VARCHAR(100),
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."vendas" (
    "id_venda" SERIAL NOT NULL,
    "data_venda" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DECIMAL(10,2),
    "forma_pg" VARCHAR(50),
    "id_usuario" INTEGER,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id_venda")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "public"."usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- AddForeignKey
ALTER TABLE "public"."item_vendas" ADD CONSTRAINT "item_vendas_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "public"."produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."item_vendas" ADD CONSTRAINT "item_vendas_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "public"."vendas"("id_venda") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."vendas" ADD CONSTRAINT "vendas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
