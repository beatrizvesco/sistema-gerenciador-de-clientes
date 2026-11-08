# Sistema de Gerenciamento de Clientes

Este projeto é uma aplicação web full-stack desenvolvida como parte da **Atividade Prática Orientada (APO)** para a disciplina de **Desenvolvimento Front-end / Back-end**. O objetivo é gerenciar o cadastro e a administração de clientes de uma empresa por meio de uma arquitetura cliente-servidor integrada.

## Tecnologias Utilizadas

* **Front-end:**

  * HTML (Estruturação semântica)

  * CSS (Estilização e responsividade)

  * JavaScript  (Manipulação do DOM e consumo de API via Fetch API)

* **Back-end:**

  * Node.js (Ambiente de execução JavaScript)

  * Express.js (Framework web para criação da API RESTful)

  * CORS Middleware (Permissão para requisições cross-origin)

##  Estrutura do Projeto

```
APO_DesenvolvSoft/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md

```

##  Como Executar o Projeto

### Pré-requisitos

* Node.js instalado na sua máquina (versão 14 ou superior recomendada).

### 1. Iniciar o Back-end (Servidor)

1. Abra o terminal e navegue até a pasta `backend`:

   ```
   cd backend
   
   ```

2. Instale as dependências do projeto:

   ```
   npm install express cors
   
   ```

3. Execute o servidor Node.js:

   ```
   node server.js
   
   ```

4. O servidor estará rodando em: `http://localhost:3000`

### 2. Executar o Front-end (Interface)

1. Abra a pasta `frontend` no seu gerenciador de arquivos.

2. Dê um duplo clique no arquivo `index.html` para abri-lo no seu navegador web desejado (Google Chrome, Firefox, Edge, etc.).

## Documentação da API REST

A API do back-end responde no endereço base `http://localhost:3000` e suporta as seguintes rotas:

| Método | Rota | Descrição | Status HTTP de Sucesso | 
| ----- | ----- | ----- | ----- | 
| **GET** | `/clientes` | Retorna a lista completa de clientes cadastrados | `200 OK` | 
| **GET** | `/clientes/:id` | Retorna os dados de um cliente específico pelo ID | `200 OK` / `404 Not Found` | 
| **POST** | `/clientes` | Cadastra um novo cliente | `201 Created` / `400 Bad Request` | 
| **PUT** | `/clientes/:id` | Atualiza os dados de um cliente existente | `200 OK` / `400 Bad Request` / `404 Not Found` | 
| **DELETE** | `/clientes/:id` | Remove um cliente pelo ID | `200 OK` / `404 Not Found` | 

### Exemplo de Estrutura do JSON (Cliente)

```
{
  "id": 1,
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "telefone": "(44) 99999-1111"
}

```

##  Fluxo de Comunicação Cliente-Servidor

1. O **Front-end** solicita a renderização da lista chamando a rota `GET /clientes` via `fetch()`.

2. O usuário envia/edita dados no formulário HTML. O JavaScript intercepta o evento `submit`, valida os campos obrigatórios (`nome` e `email`) e dispara uma requisição `POST` ou `PUT` para a API.

3. O **Back-end (Express.js)** recebe o payload JSON, processa as validações do lado do servidor e atualiza o array de dados armazenados em memória.

4. O servidor responde com o código HTTP adequado (200, 201, 400 ou 404) e uma mensagem ou os dados do cliente, conforme a operação.

5. O Front-end captura a resposta da API e manipula a estrutura do DOM para atualizar a tabela dinamicamente.