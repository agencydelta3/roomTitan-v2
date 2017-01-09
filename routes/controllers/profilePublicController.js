module.exports.controller = function (app) {
    app.get('/public-profile', function (req, res, next) {
        res.render('pages/profilePublic/publicUserProfile');
    });
};
