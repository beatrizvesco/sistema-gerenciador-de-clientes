// URL base da API 
const API_URL = 'http://localhost:3000/clientes';

// Elementos do DOM
const clientForm = document.getElementById('client-form');
const clientIdInput = document.getElementById('client-id');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const formTitle = document.getElementById('form-title');
const btnCancel = document.getElementById('btn-cancel');
const tableBody = document.getElementById('client-table-body');

// 1. READ: Buscar e listar todos os clientes da API 
async function fetchClientes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar clientes.');
    
    const clientes = await response.json();
    renderTable(clientes);
  } catch (error) {
    console.error(error);
    alert('Não foi possível carregar a lista de clientes.');
  }
}

// Renderizar linhas na tabela
function renderTable(clientes) {
  tableBody.innerHTML = '';

  if (clientes.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 5;
    emptyCell.className = 'empty-msg';
    emptyCell.textContent = 'Nenhum cliente cadastrado.';
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
    return;
  }

  clientes.forEach(cliente => {
    const tr = document.createElement('tr');
    const idCell = document.createElement('td');
    const nomeCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const telefoneCell = document.createElement('td');
    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    idCell.textContent = cliente.id;
    nomeCell.textContent = cliente.nome;
    emailCell.textContent = cliente.email;
    telefoneCell.textContent = cliente.telefone || '-';

    editButton.type = 'button';
    editButton.className = 'btn btn-edit';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editClient(cliente.id));

    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-delete';
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => deleteClient(cliente.id));

    actionsCell.append(editButton, deleteButton);
    tr.append(idCell, nomeCell, emailCell, telefoneCell, actionsCell);
    tableBody.appendChild(tr);
  });
}

// 2. CREATE & UPDATE: Submeter formulário (POST ou PUT)
clientForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = clientIdInput.value;
  const clienteData = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    telefone: telefoneInput.value.trim()
  };

  // Validação básica do front-end
  if (!clienteData.nome || !clienteData.email) {
    alert('Preencha os campos obrigatórios (Nome e E-mail).');
    return;
  }

  try {
    let response;

    if (id) {
      // Editar existente (PUT)
      response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });
    } else {
      // Criar novo (POST)
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });
    }

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.mensagem || 'Erro ao salvar dados.');
    }

    resetForm();
    fetchClientes(); // Atualizar listagem
  } catch (error) {
    console.error(error);
    alert(`Erro: ${error.message}`);
  }
});

// Preparar formulário para edição
async function editClient(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Cliente não encontrado.');

    const cliente = await response.json();

    clientIdInput.value = cliente.id;
    nomeInput.value = cliente.nome;
    emailInput.value = cliente.email;
    telefoneInput.value = cliente.telefone;

    formTitle.textContent = 'Editar Cliente';
    btnCancel.style.display = 'inline-block';
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar dados do cliente.');
  }
}

// 3. DELETE: Excluir cliente da API (DELETE)
async function deleteClient(id) {
  if (!confirm('Tem certeza de que deseja excluir este cliente?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erro ao excluir cliente.');

    fetchClientes(); // Atualizar listagem
  } catch (error) {
    console.error(error);
    alert('Não foi possível excluir o cliente.');
  }
}

// Limpar formulário
function resetForm() {
  clientForm.reset();
  clientIdInput.value = '';
  formTitle.textContent = 'Cadastrar Novo Cliente';
  btnCancel.style.display = 'none';
}

btnCancel.addEventListener('click', resetForm);

// Inicialização: carrega os clientes assim que a página abre
fetchClientes();