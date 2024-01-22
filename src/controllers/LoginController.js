const Login = require('../models/LoginModel');
const Contato = require('../models/ContatoModel');

// Renderiza a página inicial;
exports.paginaInicial = async (req, res) => {
    if(!req.session.user) return res.render('login');
    const contatos = await Contato.buscaContatos(req.session.user._id);
    return res.render('agenda', { contatos });
};

exports.formularioTratado = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.erros.length > 0) {
            req.flash('errors', login.erros);
            req.session.save(function (){
                return res.redirect('/');
            });
            return;
        }

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
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

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}