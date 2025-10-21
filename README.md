# Gerenciador de Tarefas API 🧩

Uma **API RESTful** para gerenciamento de tarefas em equipe, construída com **Node.js**, **Express**, **Prisma** e **PostgreSQL**.

---

## 🚀 Funcionalidades

- **Autenticação de Usuários:** Login seguro com **JWT (JSON Web Tokens)**.
- **Gerenciamento de Usuários:** Criação e listagem de usuários.
- **Gerenciamento de Times:** Criação, listagem, atualização e exclusão de times (**apenas admin**).
- **Gerenciamento de Membros:** Adição e remoção de membros em times (**apenas admin**).
- **Gerenciamento de Tarefas:**
  - Criação de tarefas associadas a times e membros (**admin**).
  - Listagem de tarefas por time, com filtros por status e prioridade.
  - Atualização de tarefas por membros designados ou admins.
  - Exclusão de tarefas (**admin**).
- **Histórico de Tarefas:** Registro de alterações de status, indicando quem alterou e quando.
- **RBAC (Controle de Acesso Baseado em Papéis):**
  - `admin`: acesso total.
  - `member`: pode atualizar apenas suas tarefas.

---

## 🔐 Autenticação e Autorização

- **Login:** via `/sessions`, com email e senha.  
- **Token JWT:** gerado em caso de sucesso e usado em todas as rotas autenticadas.  
- **Middlewares:**  
  - `ensureAuthenticated`: valida o token e adiciona `user.id` e `user.role` ao `request`.  
  - `ensureRole`: restringe acesso com base no papel do usuário.

---

## 🧭 Endpoints Principais

### 🔸 Autenticação (`/sessions`)

```http
POST /sessions
Body:
{
  "email": "user@example.com",
  "password": "password"
}
```

**Resposta:**
```json
{
  "token": "jwt_token",
  "user": { "id": "...", "name": "John Doe", "role": "admin" }
}
```

![Login Preview](login.png)

---

### 🔸 Criar Tarefa (`/tasks`)

```http
POST /tasks
Body:
{
  "name": "Finalizar a entrega do desafio",
  "status": "finished",
  "priority": "high",
  "assignedTo": "user_uuid",
  "teamId": "team_uuid"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "name": "Finalizar a entrega do desafio",
  "status": "finished",
  "priority": "high",
  "assignedTo": "user_uuid",
  "teamId": "team_uuid",
  "createdAt": "...",
  "updatedAt": "..."
}
```

![Create Task Preview](create-task.png)

---

## ⚙️ Configuração e Execução

1. **Clone o repositório**
   ```bash
   git clone <url_do_repositorio>
   cd gerenciador-de-tarefas
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o banco de dados (Docker)**
   ```bash
   docker-compose up -d
   ```

4. **Configure as variáveis de ambiente**
   ```bash
   cp .env-example .env
   ```
   Edite os valores conforme necessário.

5. **Aplique migrações e gere o Prisma Client**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Execute o servidor**
   ```bash
   npm run dev
   ```
   A API estará disponível em: [http://localhost:3333](http://localhost:3333)

---

## 🧩 Estrutura do Projeto

```
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   ├── app.ts
│   ├── env.ts
│   └── server.ts
├── docker-compose.yml
├── jest.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testes

Execute os testes automatizados:
```bash
npm run test:dev
```

---

## 🛡️ Considerações Adicionais

- **Tratamento de Erros:** middleware central em `src/middlewares/error-handling.ts`.
- **Validação:** feita com **Zod** em todas as entradas (`body`, `params`, `query`).
- **Segurança:** senhas com hash via `bcrypt` + autenticação JWT.

---

📸 **Demonstrações** incluídas:
- Login (`login.png`)
- Criação de Tarefa (`create-task.png`)

---

Feito com ❤️ por [Leyvison Menezes](https://github.com/Leyvison-Menezes)
