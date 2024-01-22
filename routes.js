const express = require('express');
const route = express.Router();

// Faz o requerimento dos controladores;
const loginController = require('./src/controllers/LoginController');
const registerController = require('./src/controllers/RegisterController');
const contatoController = require('./src/controllers/ContatoController');

const { checkLogin } = require('./src/middleware/middleware');
// Rotas da landing page:

route.get('/', loginController.paginaInicial);
route.post('/login', loginController.formularioTratado);
route.get('/logout', loginController.logout);

// Rotas da pagina inicial:

route.get('/register', registerController.paginaInicial);
route.post('/register', registerController.formularioTratado);

route.get('/contato/index', checkLogin, contatoController.index);
route.post('/contato/register', checkLogin, contatoController.register);
route.get('/contato/index/:id', checkLogin, contatoController.editIndex);
route.post('/contato/edit/:id', checkLogin, contatoController.editForm);
route.get('/contato/delete/:id', checkLogin, contatoController.deleteContact);
module.exports = route;