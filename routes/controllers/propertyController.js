module.exports.controller = function (app) {
    app.get('/member-property-management', function (req, res, next) {
        res.render('pages/member/property/propertyManagement');
    });
};
