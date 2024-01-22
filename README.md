# Agenda

Neste projeto, a ideia central é criar uma agenda de contatos, com front-end e back-end juntos, no modelo MVC. A agenda possuirá campo para fazer login, registrar-se, cadastrar, editar e deletar novos contatos.


### Tecnologias Utilizadas


* [NodeJS](https://nodejs.org/en)
* [MongoDB](https://www.mongodb.com/)
* [EJS](https://ejs.co)

## Dependências e Versões Necessárias

* node-js - Versão: 18.17.1
* connect-flash - Versão: 0.1.1
* connect-mongo -  Versão: 5.1.0
* core-js - Versão: 3.35.0
* css-loader - Versão: 6.9.0
* csurf - Versão: 1.11.0
* dotenv - Versão: 16.3.1
* ejs - Versão: 3.1.9
* express - Versão: 4.18.2
* express-session - Versão: 1.17.3
* helmet - Versão: 7.1.0
* mongoose - Versão: 8.0.4
* regenerator-runtime - Versão: 0.14.1
* style-loader - Versão: 3.3.4
* npm - Versão: 9.6.7
* @babel/cli - Versão: 7.23.4,
* @babel/core - Versão: 7.23.7,
* @babel/preset-env - Versão: 7.23.8,
* babel-loader - Versão: 9.1.3,
* nodemon - Versão: 3.0.2,
* webpack - Versão: 5.89.0,
* webpack-cli - Versão: 5.1.4

## Como rodar o projeto ✅

A principio, a primeira coisa a ser feita é criar um arquivo com a extensão .env na pasta raiz do projeto, e então adicionar as duas seguintes linhas:

```
CONNECTIONSTRING= 
SESSION_SECRET=
```
Na primeira linha, deve-se colocar a string de conexão do MongoDB, obtida ao criar um banco de dados no MongoDB. Deve-se criar um usuário com permissão Atlas na aba Database Access, e então, em Database, na seção Connect, selecione a opção drivers, e copie a connection string, substituindo os campos <username> e <password> com o nome de usuário e senha do usuário criado anteriormente.

Na segunda linha, se trata de uma configuração que deve conter alguma mensagem que deve-se manter em sigilo, no entanto, não há a necessidade, neste projeto, de escrever algo tão grande ou difícil. Uma palavra qualquer basta.

Feito isso, abra o terminal, na pasta raiz, e execute o seguinte comando:

```
npm i
```
Esse comando instalará todas as dependências necessárias.

Depois, rode o seguinte comando:

```
npm start
```

Se tudo funcionar corretamente, no terminal deverá aparecer a seguinte mensagem:

```
Servidor executando na porta 3000.
http://localhost:3000
```

Após isso, você pode acessar o link informado e verificar se o projeto está funcionando.


## ⚠️ Problemas enfrentados

### Problema 1:
O site não está responsivo, sendo assim, não será possível utiliza-lo em dispositivos móveis.
* Como solucionar: Adicionar configurações para transformar a exibição do site conforme necessário, dependendo do tamanho de cada tela.

### Problema 2:
Provavelmente (Não testei para ter a certeza, mas é quase certo que sim) é possível editar e deletar contatos de outras pessoas, se houver o ID do contato.
* Como solucionar: Fazer uma verificação para confirmar que quem está fazendo a requisição de update ou delete é a pessoa que criou o contato.

## ⏭️ Próximos passos

Futuramente, gostaria de fixar esses problemas citados acima. Além disso, pretendo arrumar o arquivo .CSS, que está muito confuso, e alterar as classes e IDs das tags, consequentemente.
