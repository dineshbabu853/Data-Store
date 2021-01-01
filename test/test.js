var assert = require("assert");
var fs = require("fs");
var os = require("os");
var path = require("path");
var util = require("util");

describe("data-store read , write and delete operation tests", function () {
  var pathname;
  var content = JSON.stringify({
    person1: {
      value: { age: 21, userId: 2346, city: "bangalore" },
    },
  });

  before(function () {
    var filename = util.format("data-store-mocha-%s.json", process.pid);
    pathname = path.join(os.tmpdir(), filename);
  });

  it("should write data to file", function (done) {
    try {
      fs.writeFileSync(pathname, content);
      done();
    } catch (err) {
      done(err);
    }
  });

  it("should read data from file", function (done) {
    try {
      let data = JSON.stringify(JSON.parse(fs.readFileSync(pathname)));
      assert.strictEqual(data, content);
      done();
    } catch (err) {
      return done(err);
    }
  });

  it("should delete key from file", function (done) {
    try {
      let json = JSON.parse(fs.readFileSync(pathname));
      let key = "person1";
      delete json[key];
      fs.writeFileSync(pathname, JSON.stringify(json));
      let updateJson = JSON.parse(fs.readFileSync(pathname));
      if (!updateJson[key]) done();
    } catch (err) {
      return done(err);
    }
  });

  after(function () {
    fs.unlinkSync(pathname);
  });
});
