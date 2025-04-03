CREATE TABLE cliente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  cnpj VARCHAR(20) NOT NULL,
  nome_responsavel VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  endereco VARCHAR(255),
  cidade VARCHAR(100),
  estado VARCHAR(50),
  cep VARCHAR(20),
  data_criacao DATE NOT NULL
);

CREATE TABLE produto_posicionador (
  id INT PRIMARY KEY AUTO_INCREMENT,
  descricaoProduto VARCHAR(255) NOT NULL,
  nSerieEquipamento VARCHAR(100) NOT NULL,
  protocolo VARCHAR(100) NOT NULL,
  nSerieBase VARCHAR(100) NOT NULL,
  nSeriePlaca1 VARCHAR(100) NOT NULL,
  nSeriePlaca2 VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  modelo VARCHAR(100) -- pode ser NULL
);


CREATE TABLE produto_transmissor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  descricaoProduto VARCHAR(255) NOT NULL,
  nSerieEquipamento VARCHAR(100) NOT NULL,
  protocolo VARCHAR(100) NOT NULL,
  sensor INT NOT NULL,
  nSerieSensor VARCHAR(100) NOT NULL,
  faixa VARCHAR(100) NOT NULL,
  dataFabric DATE NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  modelo VARCHAR(100) -- pode ser nulo
);

CREATE TABLE pecas (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  ItemID INT NOT NULL,
  Carcaca VARCHAR(100) NOT NULL,
  Visor VARCHAR(100) NOT NULL,
  NumeroItem INT NOT NULL,
  Quantidade INT NOT NULL,
  Descricao VARCHAR(255) NOT NULL,
  Codigo VARCHAR(100) NOT NULL,
  Observacao TEXT,
  DataCadastro DATE NOT NULL,
  valorPeca DECIMAL(10, 2) NOT NULL,
  nSeriePlaca VARCHAR(100),
  protocolo VARCHAR(100),
  nSerieSensor VARCHAR(100),
  faixaSensor VARCHAR(100),
  dataFabricacao DATE,
  modeloPlaca VARCHAR(100)
);

CREATE TABLE service (
  id INT PRIMARY KEY AUTO_INCREMENT,
  modelo VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  equipamentoID VARCHAR(50) NOT NULL,
  equipamentoDescricao VARCHAR(255) NOT NULL,
  codService VARCHAR(100) NOT NULL,
  DataCadastro DATE NOT NULL,
  idCliente VARCHAR(50) NOT NULL,
  descCliente VARCHAR(255) NOT NULL,
  status ENUM('Não iniciado', 'Em desenvolvimento', 'Concluído') NOT NULL
);

CREATE TABLE vendas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  idVenda VARCHAR(50) NOT NULL,
  nomeCliente VARCHAR(100) NOT NULL,
  itemVenda VARCHAR(10) NOT NULL,
  tipoProduto VARCHAR(50) NOT NULL,
  dataProposta DATETIME NOT NULL,
  dataVenda DATETIME,
  status VARCHAR(50) NOT NULL,
  descricaoProduto VARCHAR(255) NOT NULL,
  nSerieEquipamento VARCHAR(100) NOT NULL
);


CREATE TABLE servico_peca (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  codService VARCHAR(100) NOT NULL,
  peca_id INT NOT NULL,
  quantidade_peca INT NOT NULL,
  servico_id INT NOT NULL
);

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL UNIQUE,
  Senha VARCHAR(255) NOT NULL,
  perfil ENUM('admin', 'usuario') DEFAULT 'usuario',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
