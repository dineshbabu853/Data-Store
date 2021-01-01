var assert = require("assert");
var fs = require("fs");
var os = require("os");
var path = require("path");
var util = require("util");

describe("data-store read write operation tests", function () {
  var pathname;
  var content = JSON.stringify({
    person2: {
      value: { age: 21, userId: 2346, city: "bangalore" },
    },
  });

  before(function () {
    var filename = util.format("data-store-mocha-%s.json", process.pid);
    pathname = path.join(os.tmpdir(), filename);
  });

  it("should write to file", function (done) {
    try {
      fs.writeFileSync(pathname, content);
      done();
    } catch (err) {
      done(err);
    }
  });

  it("should read from file", function (done) {
    try {
      let data = JSON.stringify(JSON.parse(fs.readFileSync(pathname)));
      assert.strictEqual(data, content);
      done();
    } catch (err) {
      return done(err);
    }
  });

  after(function () {
    fs.unlinkSync(pathname);
  });
});
