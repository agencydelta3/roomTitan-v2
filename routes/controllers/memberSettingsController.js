module.exports.controller = function (app) {
    app.get('/member-setings', function (req, res, next) {
        res.render('pages/member/settings/memberAddedProfile');
    });
};
