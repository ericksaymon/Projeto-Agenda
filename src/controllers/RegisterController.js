const { Register } = require('../models/RegisterModel');

exports.paginaInicial = (req, res) => {
    if(!req.session.user) return res.render('register');
    res.redirect('/');
};

exports.formularioTratado = async (req, res) => {
    try {
        const login = new Register(req.body);
        await login.register();
    
        if(login.erros.length > 0) {
            req.flash('errors', login.erros);
            req.session.save(function (){
                return res.redirect('/register');
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso!');
        req.session.save(function (){
            return res.redirect('/');
        });
        return;
    }
    catch(e) {
        console.log(e);
        return res.render('404');
    }
};