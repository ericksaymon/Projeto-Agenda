// Arquivo para segurança das senhas;
require('dotenv').config();

// Requerir as principais dependências;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { checkCsrfError, csrfMiddleware, errorsGlobals } = require('./src/middleware/middleware');

// Conectar ao banco de dado;
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    app.emit('ready');
}).catch(e => console.log(e.message));

// Outras dependências para sessions;
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Porta em que o servidor roda;
const port = 3000;

// Arquivo que gerência as rotas;
const routes = require("./routes");

// Arquivos de segurança;
const helmet = require('helmet');
const csfr = require('csurf');
app.use(helmet());

// Permite o envio de formulários;
app.use(express.urlencoded( { extended: true }));

// Define a pasta estática;
app.use(express.static('./public'));

// Define as opções de sessões;
const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    httpOnly: true
});

// Utiliza as configuraçõs de sessões e do csfr para segurança;
app.use(sessionOptions);
app.use(flash());
app.use(csfr());


// Define a pasta de views e a view engine;
app.set('views', './src/views');
app.set('view engine', 'ejs');


// Utiliza as middlewares globais e o arquivo routes como rotas;
app.use(errorsGlobals);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

// Espera a conexão com o banco de dados para executar o servidor;
app.on('ready', () => {
    app.listen(port, () => {
        console.log(`Servidor executando na porta ${port}.`);
        console.log(`http://localhost:${port}`);
    });
})
