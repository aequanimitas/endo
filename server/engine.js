const app = require('./app');
module.exports = {
  start: function start(callback) {
    const port = process.env.PORT || 4000;

    app.listen(port, function() {
      console.log("Server listening at http://localhost:%s", port);
      if (callback) callback();
    });
  }
};
