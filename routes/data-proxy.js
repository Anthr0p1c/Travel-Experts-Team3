// https://codeforgeek.com/reverse-proxy-using-expressjs/

var serverOne = "https://travel-experts-python.herokuapp.com/";
var serverTwo = "https://agent-data-travel-experts.herokuapp.com/";

module.exports = function (req, res) {

  if (!req.user || req.user.role != "manager") {
    req.session.msg = "You are not allowed to access the business data.";
    res.status(403).redirect("/");
  }
  res.render("data", { serverOne })



};
