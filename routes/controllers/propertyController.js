module.exports.controller = function (app) {
  app.get('/property/manage', function (req, res, next) {
      res.render('pages/propertyManagement/manageProperty');
  });
  app.get('/property/manage/roommate', function (req, res, next) {
      res.render('pages/member/property/propertyManagement');
  });
};
