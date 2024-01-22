const mongoose = require('mongoose');

// Cria um novo esquema no bando de dados;
const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: {type: String, required: false },
    telefone: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now },
    idUsuario: { type: String, required: true}
});

// Cria ou utiliza o modelo no esquema;
const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body, userId) {
        this.body = body;
        this.erros = [];
        this.contato = null;
        this.userId = userId;
    };

    async register() {
        this.valida();
        if(this.erros.length > 0) return;

        await this.contactExists();

        if(this.erros.length > 0) return;

        this.contato = await ContatoModel.create(this.body);
    };

    async contactExists() {
        this.telefone = await ContatoModel.findOne({ telefone: this.body.telefone });
        this.email = await ContatoModel.findOne({ email: this.body.email });
        if(this.telefone && this.email) this.erros.push('Contato já cadastrado.');
    };

    valida() {
        this.cleanUp();
        this.verificarNulo(this.body.nome, 'Nome');

        this.verificarNulo(this.body.sobrenome, 'Sobrenome');

        this.verificarNulo(this.body.email, 'Email');

        this.verificarNulo(this.body.telefone, 'Telefone');

    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        };

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
            idUsuario: this.userId
        };

        console.log(this.body)
    };

    verificarNulo(parametro, localidade) {
        if (!parametro) {
            this.erros.push(`O campo '${localidade}' não pode estar vazio.`);
        };
        return;
    };

    static buscaPorId = async function (id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    };

    edit = async (id) => {
        if(typeof id !== 'string') return;
        this.valida();
        if(this.erros.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    };

    static buscaContatos = async (id) => {
        const contatos = await ContatoModel.find( { idUsuario: id} ).sort({ criadoEm: -1 });
        return contatos;
    };

    static deletaContatos = async (id) => {
        await ContatoModel.findByIdAndDelete(id);
    }
}

// Exporta o modelo;
module.exports = Contato