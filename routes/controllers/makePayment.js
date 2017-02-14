module.exports.controller = function (app) {

    app.get('/make-payment', function (req, res, next) {
        res.render('pages/member/makePayment/selectForPayment');
    });
    
};
