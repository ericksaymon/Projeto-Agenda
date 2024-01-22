const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { LoginModel, Register } = require('./RegisterModel');

class Login extends Register {
    constructor (body) {
        super(body)
    }

    async login() {
        this.cleanUp();
        if(this.erros.length > 0) return;
        this.user = await LoginModel.findOne({ usuario: this.body.usuario });
        if(!this.user) {
            this.erros.push('Usuário ou senha inválidos.');
            return;
        }
        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.erros.push('Usuário ou senha inválidos.');
            this.user = null
            return;
        };
    };
};

module.exports = Login;