const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite receber dados no formato JSON no corpo das requisições

// Dados armazenados em memória
let clientes = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "(44) 99999-1111" },
  { id: 2, nome: "Carlos Oliveira", email: "carlos@email.com", telefone: "(44) 98888-2222" }
];

let proximoId = 3;

// --- ROTAS DA API REST ---

// 1. GET /clientes - Listar todos os clientes
app.get('/clientes', (req, res) => {
  return res.status(200).json(clientes);
});

// 2. GET /clientes/:id - Consultar um cliente específico
app.get('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);

  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  return res.status(200).json(cliente);
});

// 3. POST /clientes - Cadastrar um novo cliente
app.post('/clientes', (req, res) => {
  const { nome, email, telefone } = req.body;
  const nomeTratado = typeof nome === 'string' ? nome.trim() : '';
  const emailTratado = typeof email === 'string' ? email.trim() : '';

  // Validação básica de campos obrigatórios
  if (!nomeTratado || !emailTratado) {
    return res.status(400).json({ mensagem: "Campos obrigatórios: Nome e E-mail." });
  }

  const novoCliente = {
    id: proximoId++,
    nome: nomeTratado,
    email: emailTratado,
    telefone: typeof telefone === 'string' ? telefone.trim() : ""
  };

  clientes.push(novoCliente);
  return res.status(201).json(novoCliente);
});

// 4. PUT /clientes/:id - Atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, telefone } = req.body;
  const nomeTratado = typeof nome === 'string' ? nome.trim() : '';
  const emailTratado = typeof email === 'string' ? email.trim() : '';

  const index = clientes.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  // Validação dos campos obrigatórios
  if (!nomeTratado || !emailTratado) {
    return res.status(400).json({ mensagem: "Campos obrigatórios: Nome e E-mail." });
  }

  clientes[index] = {
    id,
    nome: nomeTratado,
    email: emailTratado,
    telefone: typeof telefone === 'string' ? telefone.trim() : ""
  };

  return res.status(200).json(clientes[index]);
});

// 5. DELETE /clientes/:id - Excluir um cliente
app.delete('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  clientes.splice(index, 1);
  return res.status(200).json({ mensagem: "Cliente removido com sucesso." });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor em execução em http://localhost:${PORT}`);
});