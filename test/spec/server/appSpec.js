var app = require("../../../server/app");

describe("App Configuration", function() {
  it("base path should be on client, like angular-fullstack", function() {
    expect(app.get("view engine")).not.toBeUndefined("view engine should be set");
    expect(app.get("view engine")).toEqual("html");
  });
});
