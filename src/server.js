// const http = require('http') // CommonJS => require
import http from "node:http"; // ESModules => import/export

import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

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

// Query Parameters: URL STATEFUL => Filtros, paginação, não-obrigatórios
// Route Parameteres: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Dvd

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333/users

// Criar rotas de Edição e remoção
// Rota de remoção > Route Parameteres

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333); // localhost:3333
