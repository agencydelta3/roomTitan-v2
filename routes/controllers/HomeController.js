module.exports.controller = function (app) {
    app.get('/welcome-home', function (req, res, next) {
        res.render('pages/home/home');
    });
};
