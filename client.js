//sample client usage file for using local data Store

//import the dataStore
let dataStore = require("data-store-local");

//create a object for the data store
//This takes two arguments clientId and the file path(optional)
//clientId should be a unique four digit number provided by user
let clientId = 2343; //sample clientId
//clientId restricts the access to only one client at any given time in a computer
let myDataStore = new dataStore(clientId);
//let myDataStore = new dataStore(clientId , "C:\\Project\\files");
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
