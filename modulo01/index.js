const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=Murilo (const nome = req.query.nome)
// Route params = /users/1 (const { id } = req.params)
// Request body = { "name": "Murilo" } 

const users = ['Murilo', 'Diego', 'Cláudio', 'Victor'];

//Middleware Global, é executado antes de qualquer rota
server.use((req, res, next) => {
  console.time('Request'); 
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  
  next(); //Continua a execução do proxímo medmiddleware, nesse caso as rotas get,post,put,delete
  // Executa somente depois que terminar o next();
  console.timeEnd('Request'); // Exibe o tempo que levou para retornar a resposta
});

// Middleware local
function checkUserExists(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: 'User name is required'});
  }
  return next();
}

// Middleware local
function checkUserInArray(req, res, next){
  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({ error: 'User does not exists'});
  }
  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res)=> {
  return res.json( req.user );
});

server.post('/users', checkUserExists,  (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) =>{
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;
  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);