module.exports.controller = function (app) {
    app.get('/member-alerts', function (req, res, next) {
        res.render('pages/member/alert/memberAlertFirstPage');
    });
    app.get('/member-alert-details', function (req, res, next) {
        res.render('pages/member/alert/memberAlertDetails');
    });
};
