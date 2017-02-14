module.exports.controller = function (app) {

    app.get('/payment-history', function (req, res, next) {
        res.render('pages/member/paymentHistory/paymentHistorySummary');
    });

};
