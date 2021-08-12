//David

// Heroku cloud server hosting python data analysis
var serverOne = "https://travel-experts-python.herokuapp.com/";
var serverTwo = "https://agent-data-travel-experts.herokuapp.com/";

module.exports = function (req, res) {
  //If manager login display access
  if (!req.user || req.user.role != "manager") {
    req.session.msg = "You are not allowed to access the business data.";
    res.status(403).redirect("/");
  }
  res.render("data", { serverOne })



};
