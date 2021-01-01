//sample client usage file for using local data Store

//import the dataStore
let dataStore = require("./src/dataStore");

//create a object for the data store
//If you wish to create data store in a specific location provide the file path as argument
//example : let myDataStore2 = new dataStore("D:\\Project\\data");
//If file path is not provided then default location will be current working directory
let myDataStore = new dataStore();
//get an instance using getInstance method
let instance = myDataStore.getInstance();

//create operation using create method
//It takes three arguments : key(string) , value(json) , timeToLive(integer) property in seconds - optional
let key = "person1";
let value = { age: 22, userId: 2345, city: "chennai" };
let timeToLive = 3;
instance.create(key, value, timeToLive);

instance.create("person2", { age: 21, userId: 2346, city: "bangalore" }, 4);

//read operation using get method
let myVal = instance.get("person1");
console.log("myVal: ", myVal);

//delete operation using delete method
instance.delete("person1");

//update operation using update method
let newVal = { age: 24, userId: 2345, city: "pune" };
instance.update("person2", newVal);

//check if the user is trying to access a expired key
setTimeout(() => {
  instance.get("person2");
}, 4000);
