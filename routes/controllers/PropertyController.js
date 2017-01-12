module.exports.controller = function (app) {
    app.get('/property/manage', function (req, res) {
        res.render('pages/propertyManagement/manageProperty');
        // res.render('/pages/profilePublic/publicUserProfile');
    });

    app.get('/property/manage/edit', function (req, res) {
        res.send("Profile Edit Page!");
    });
}
