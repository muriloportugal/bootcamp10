<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

Neste primeiro desafio iremos criar um serviço back-end com algumas funcionálidades básicas que já vimos até o momento.  
- Cadastro de usuário;  
- Autenticação de usuário utilizando JsonWebToken;  
- Gestão de destinatários (cadastro e atualização);  

## Como Utilizar  
Neste desafio estamos utilizando o banco PostgreSQL, pode instalar localmente ou utilizar um docker, lembre-se de usar os mesmos dados de nome do banco, login e senha que colocar no arquivo [database.js](./src/config/database.js).  
Após clonar o projeto para sua máquina e com o banco PostgreSQL rodando execute as migrations para que sejam criadas as tabelas do banco com o comando abaixo:  

    yarn sequelize db:migrate

Execute o comando abaixo para que seja criado o usuário administrador:  

    yarn sequelize db:seed:all

Podemos iniciar o nosso back-end com o comando:  

    yarn dev
Ou para debugar  

    yarn dev:debug

E agora com o Insonmia ou o Postman pode testar a aplicação utilizando as rotas abaixo.  

## Rotas  
- Para autenticação do usuário como administrador:  

POST:  
http://localhost:3333/sessions  
Enviando no corpo da request o JSON:  

    {
      "email": "admin@fastfeet.com",
      "password": "123456"
    }  

- Cadastro destinatários (Somente após autenticação):  

POST:  
http://localhost:3333/recipients  
Enviando no corpo da request o JSON:  

    {
      "name": "Nome do destinatário",
      "street": "Rua do destinatário",
      "number": 111,
      "state": "Estado",
      "city": "Cidade",
      "zip_code": 11111111
    }  

- Alterar dados destinatário (Somente após autenticação):  

PUT:  
http://localhost:3333/recipients  
Enviando no corpo da request o JSON:  

    {
      "name": "Nome do destinatário",
      "street": "Nova Rua do destinatário",
      "number": 222,
      "state": "Estado",
      "city": "Cidade",
      "zip_code": 22222222
    }

## Tecnologias Utilizadas:
- Express;
- Sucrase;
- Nodemon;
- ESLint;
- Prettier;
- EditorConfig;
- Sequelize;
- PostgreSQL;
- JsonWebToken;
