module.exports = function(app){
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
}
