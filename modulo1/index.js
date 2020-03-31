const express = require("express");

const server = express();
server.use(express.json());

/**
 * Query Params = ?teste=1
 * Route Params = /users/1
 * Request body = { "name": Diego, "email": "diegosampaio18@gmail.com" }
 */

const users = ["Diego", "Palloma", "Sirius"];

// 'req' = request (requisição), 'res' = response (resposta) e 'next' = próximo (avança a aplicação, caso o método seja impeditivo)
// Middleware que mostra o tempo de execução da requisição e mostra o método e URL da mesma
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

// Middleware que checa se o nome do usuário foi informado na requisição (JSON)
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

// Middleware que checa se o usuário enviado na requisição existe
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
