module.exports.controller = function (app) {
    app.get('/search/:location?', function (req, res, next) {
        res.render('pages/propertyListing/propertyList');
    });
};
