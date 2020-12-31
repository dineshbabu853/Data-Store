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
    //create a empty file
    fs.writeFileSync(this.filePath, JSON.stringify({}));
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
        throw new Error(`Key ${key} does not exist`);
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
    try {
      let expiresAt;
      let filePath = this.filePath;

      let valid = this.isWithinLimit(key, value);
      if (valid !== true) {
        throw new Error(valid.errorMessage);
      }

      if (timeToLive) {
        expiresAt = new Date().getTime() + timeToLive * 1000;
      }
      let val = {
        value,
        expiresAt,
      };

      var stats = fs.statSync(filePath);
      var fileSizeInBytes = stats.size;
      if (fileSizeInBytes > this.fileSizeLimit) {
        throw new Error("File size limit exceeded.");
      }
      let json = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (json[key]) {
        throw new Error("Key already exists");
      }
      json[key] = val;
      fs.writeFileSync(filePath, JSON.stringify(json));
      console.log(`key ${key} is inserted into data store`);
    } catch (err) {
      console.log(err);
    }
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
      console.log(`the key ${key} is deleted`);
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
    let valueSize = Buffer.byteLength(JSON.stringify(value)) / 1024;

    if (keySize > 32 || valueSize > 16) {
      return keySize > 32
        ? { errorMessage: "Key size is not within limit(32 chars)" }
        : { errorMessage: "value size is not within limit(16 KB)" };
    } else {
      return true;
    }
  }
}
//Singleton class to provide only single instance at a time for client
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new dataStore();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
