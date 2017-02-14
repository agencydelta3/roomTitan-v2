module.exports.controller = function (app) {

    app.get('/add-expenses', function (req, res, next) {
        res.render('pages/member/expenses/addExpenses');
    });

    app.get('/view-expenses', function (req, res, next) {
        res.render('pages/member/expenses/viewExpenses');
    });
    app.get('/details-view-expenses', function (req, res, next) {
        res.render('pages/member/expenses/viewExpensesDetails');
    });


};
