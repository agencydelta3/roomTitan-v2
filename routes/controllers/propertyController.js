module.exports.controller = function (app) {
  app.get('/member-property-management', function (req, res, next) {
      res.render('pages/member/property/addEdit/propertyManagement');
  });

  app.get('/property/manage', function (req, res) {
      res.render('pages/propertyManagement/manageProperty');
  });
};
