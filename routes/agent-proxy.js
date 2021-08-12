// David

// Heroku cloud hosting of agent data analysis
var serverTwo = "https://agent-data-travel-experts.herokuapp.com/";

module.exports = function (req, res) {
    // Check if user role is agent
    if (!req.user || req.user.role != "Senior Agent") {
        req.session.msg = "You are not allowed to access the business data.";
        res.status(403).redirect("/");
      }
      res.render("sales", { serverTwo })



};
