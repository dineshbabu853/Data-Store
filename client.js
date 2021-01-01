//sample client usage file for using local data Store

//import the dataStore
let dataStore = require("./src/dataStore");
//create a object for the data store
let myDataStore = new dataStore();
//get an instance using getInstance method
let instance = myDataStore.getInstance();

//create operation using create method
//It take three arguments : key(string) , value(json) , timeToLive(integer) property in seconds - optional
instance.create("person1", { age: 22, userId: 2345, city: "chennai" }, 3);
instance.create("person2", { age: 21, userId: 2346, city: "bangalore" }, 4);

//read operation using get method
let value = instance.get("person1");
console.log(value);

//delete operation using delete method
instance.delete("person1");

//check if the user is trying to access a expired key
setTimeout(() => {
  instance.get("person2");
}, 4000);
