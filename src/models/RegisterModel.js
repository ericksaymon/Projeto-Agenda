// Faz a conexão com o DB;
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Cria um novo esquema no bando de dados;
const LoginSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    senha: { type: String, required: true }
});

// Cria ou utiliza o modelo no esquema;
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    };

    async register() {
        this.valida();
        if(this.erros.length > 0) return;

        await this.userExists();

        if(this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        this.user = await LoginModel.create(this.body);
    };

    async userExists() {
        this.user = await LoginModel.findOne({ usuario: this.body.usuario });
        if(this.user) this.erros.push('Usuário já cadastrado.');
    };

    valida() {
        this.cleanUp();
        if (Login.verificarNulo(this.body.usuario, 'Usuário')) {
            this.erros.push(Login.verificarNulo(this.body.usuario, 'Usuário').message);
        };

        if (this.body.usuario.length < 3 || this.body.usuario.length > 30) {
            const erro = new Error('O nome de usuário deve conter entre 3 e 30 caracteres.');
            this.erros.push(erro.message);
        };

        const verificacaoDeCaracteres = this.body.usuario.split('').filter(valor => {
            const caracteresInvalidos = ['|', '/', `\\`, '.', ',', '<', '>', '?', ':'];
            for (const valores of caracteresInvalidos) {
                if (valores === valor) return valor;
            }
            return;
        });

        if (verificacaoDeCaracteres.length > 0) {
            const erro = new Error('O nome de usuário deve conter apenas letras ou números.');
            this.erros.push(erro.message);
        };

        if (Login.verificarNulo(this.body.senha, 'Senha')) {
            this.erros.push(Login.verificarNulo(this.body.senha, 'Senha').message);
        };
        if (this.body.senha.length < 6 || this.body.senha.length > 12) {
            const erro = new Error('A senha precisa conter entre 6 e 12 caracteres.');
            this.erros.push(erro.message);
        };
    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        };

        this.body = {
            usuario: this.body.usuario,
            senha: this.body.senha
        };
    };

    static verificarNulo(parametro, localidade) {
        if (!parametro) {
            return new Error(`O campo '${localidade}' não pode estar vazio.`);
        };
    };
}

// Exporta o modelo;
module.exports = {
    LoginModel: LoginModel,
    Register: Login
}