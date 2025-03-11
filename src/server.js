// const http = require('http') // CommonJS => require
import http from "node:http"; // ESModules => import/export
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

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    // Early return
    return res.end("Listagem de usuários");
  }

  if (method === "POST" && url === "/users") {
    return res.end("Criação de usuário");
  }

  return res.end("helloworld");
});

server.listen(3333); // localhost:3333
