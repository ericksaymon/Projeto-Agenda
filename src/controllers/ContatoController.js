const Cadastro = require('../models/ContatoModel');

exports.index = (req, res) => {
    return res.render('agendaDeEdicao', {
        contato: {}
    });
};

exports.register = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body, req.session.user._id);
        await cadastro.register();
    
        if(cadastro.erros.length > 0) {
            req.flash('errors', cadastro.erros);
            req.session.save(function (){
                return res.redirect('/contato/index');
            });
            return;
        }
        req.flash('success', 'Usuário cadastrado com sucesso!');
        return req.session.save(() => res.redirect(`/contato/index/${cadastro.contato._id}`));
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
    
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contato = await Cadastro.buscaPorId(req.params.id);
    if(!contato) return res.render('404');
    res.render('agendaDeEdicao', { contato });
};

exports.editForm = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const cadastro = new Cadastro (req.body, req.session.user._id);
        await cadastro.edit(req.params.id);
        if(cadastro.erros.length > 0) {
            req.flash('errors', cadastro.erros);
            req.session.save(function (){
                return res.redirect('/contato/index');
            });
            return;
        }
        req.flash('success', 'Usuário editado com sucesso!');
        return req.session.save(() => res.redirect(`/contato/index/${cadastro.contato._id}`));
    } catch (e){
        console.log(e);
        res.render('404');
    }
};

exports.deleteContact = async (req, res) => {
    try {
        await Cadastro.deletaContatos(req.params.id);
        req.flash('success', 'Usuário deletado com sucesso!');
        return req.session.save(() => res.redirect('/'));
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};