// const http = require('http') // CommonJS => require
import http from "node:http"; // ESModules => import/export
import { json } from "./middlewares/json.js";
// import fastify from 'fastify'

// Criar um usuário (name, email, password)

// HTTP
// - Método HTTP
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criando um usuário no back-end

// Stateful - Algum tipo de informação será armazenada em memória, a aplicação depende da memória para que continue funcionando.
// Stateless - Não salva em memória, salva em dispositivos externos como banco de dados, arquivos de texto etc.

// Cabeçalhos (Requisição/resposta) => Metadados (informações para que o back-end e o frontend saibam lidar com a informação do array convertido em JSON)

// HTTP Status Code

// Porta de entrada > req, stdin
// Porta de saída > res, stdout

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    // Early return
    return res.end(JSON.stringify(users)); // Utilizar JSON (JavaScript Object Notation) para converter array em string
  }

  // Por ser uma aplicação STATEFUL, é necessário rodar no terminal "http POST localhost:3333/users" após a criação de um novo usuário
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333); // localhost:3333
