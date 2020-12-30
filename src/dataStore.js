const fs = require("fs");
const runningInstances = [];

class dataStore {
  constructor(path = null) {
    if (path) {
      //If filepath is provided by user
      this.filePath = `${path}\\db.json`;
    } else {
      //If filepath is not provided by user then file will be created in the current working directory
      this.filePath = `db.json`;
    }
    //throw error if another client tries to access the same file
    if (fs.existsSync(this.filePath)) {
      throw new Error("The file you are trying to access is already in use!");
    }
    //initialize file size limit to 1GB
    this.fileSizeLimit = 1024 * 1024 * 1024;
  }

  /**
   * The get method is used to get the corresponding value for a given key
   * @param {key} key for getting the value
   */
  get(key) {
    try {
      let json = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      if (json[key]) {
        //If the provided was expired appropriate error is thrown
        if (json[key].expiresAt && this.isExpired(json[key])) {
          throw new Error("Oops the key you are trying to access is expired!");
        }
        //return the value as JSON
        return json[key].value;
      } else {
        throw new Error("Key does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * The create method is used to add a new key value pair to the database
   * @param {key} key appropriate key for the data
   * @param {value} value  appropriate key for the data
   * @param {timeToLive} timeToLive is the life span of a key
   */
  create(key, value, timeToLive = null) {
    let expiresAt;
    let filePath = this.filePath;
    let obj = {};
    if (!this.isWithinLimit(key, value)) {
      throw new Error("key/value size is not within limit");
    }
    if (timeToLive) {
      expiresAt = new Date().getTime() + timeToLive * 1000;
    }
    let val = {
      value,
      expiresAt,
    };
    obj[key] = val;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(obj), function (err) {
        if (err) throw err;
      });
      return;
    }
    var stats = fs.statSync(filePath);
    var fileSizeInBytes = stats.size;
    if (fileSizeInBytes > fileSizeLimit) {
      throw new Error("File size limit exceeded.");
    }
    let json = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (json[key]) {
      throw new Error("Key already exists");
    }
    json[key] = val;
    fs.writeFileSync(filePath, JSON.stringify(json), function (err) {
      if (err) throw err;
    });
  }
  /**
   * The delete method is used to delete a key from the database
   * @param {key} key appropriate key for the data
   */
  delete(key) {
    try {
      let json = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      if (!json[key]) {
        console.log("Enter a valid key to delete");
        return;
      }
      delete json[key];
      fs.writeFileSync(this.filePath, JSON.stringify(json));
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * The isExpired method is used to check is a key is expired or not
   * @param {element} element is a object containing required data
   */
  isExpired(element) {
    if (!element.expiresAt) return true;
    return new Date().getTime() > element.expiresAt;
  }
  isWithinLimit(key, value) {
    let keySize = key.length;
    console.log("keySize: ", keySize);
    let valueSize = Buffer.byteLength(JSON.stringify(value)) / 1024;
    console.log("valueSize: ", valueSize);

    if (keySize > 32 || valueSize > 16) {
      return false;
    } else {
      return true;
    }
  }
}
module.exports = dataStore;
