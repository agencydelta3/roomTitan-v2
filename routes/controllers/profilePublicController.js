module.exports.controller = function (app) {
    app.get('/public-profile', function (req, res, next) {
        res.send('respond with a public-profile');
    });
};
