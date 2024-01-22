// Verifica se há algum erro;
exports.errorsGlobals = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

// Verifica se há algum erro de csrf;
exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
    
};

// Cria o token de verificação de CSRF;
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.checkLogin = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login para acessar esta página.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
};