module.exports.controller = function (app) {
  app.get('/property/manage', function (req, res) {
    res.send("Mange your property here Mazba!!!");
  });
  app.get('/property/manage/edit', function (req, res) {
    res.send("Profile Edit Page!");
  });
}
