const express = require('express');

const server = express();
server.use(express.json());

let counter = 0;
// Middleware Global
server.use((req, res, next) => {
  counter++;
  console.log(`${counter} Requests`);
  next();
});

// Middleware Local
function checkIdExists(req, res, next){
  const { id } = req.params;
  const index = projects.findIndex(project => project.id === id);
  if ( index < 0 ) return res.status(400).json({error: `ID ${id} not found`});
  req.index = index;
  next();
}

const projects = [ 
  {
    id: '1',
    title: 'Pojeto Node',
    tasks: ['Criar rotas','Criar testes automatizados']
  }];

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push(
    { 
      id,
      title,
      tasks: []
    });

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { title } = req.body;
  const { index } = req; // Adicionado a requisição no checkIdExists.
  projects[index].tasks.push(title);
  return res.json(projects);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { index } = req; // Adicionado a requisição no checkIdExists.
  projects.splice(index,1);
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { title } = req.body;
  const { index } = req; // Adicionado a requisição no checkIdExists.
  projects[index].title = title;
  return res.json(projects);
});



server.listen(3000);