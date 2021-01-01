# Key Value Data-Store   
This is file based Key value data store built using **node js**

## *Core Functionalities*
1. Supports CREATE , READ , DELETE and UPDATE operation   
2. Restricts key size to 32 chars and value size to 16KB   
3. Allows client to instantiate the class and work on   
4. File can be created using optional file path , if it is not provided it will be created in current working directory   
5. Allows only one client to access file at a time   
6. Every key will have a optional timeToLive property   
7. Uses Singleton approach   
8. Thread safe   

## *Steps to run file locally:*
1. run ```npm i``` to install dependencies   
2. run ```npm start``` to run the application    
3. run ```npm test``` to run tests

## *Usage*
**Import the data store**    
```
let dataStore = require("./src/dataStore")    
```

**Creating an instance for the dataStore**   
note: *Filepath* can be provided as an argument if needed    
```
let myDataStore = new dataStore()   
let instance = myDataStore.getInstance()   
```

**Create operation**    
```
let key = "person1";
let value = { age: 22, userId: 2345, city: "chennai" };
let timeToLive = 3;
instance.create(key, value, timeToLive);
```

**Read operation**
```
let myVal = instance.get("person1");    
```

**Delete operation**
```
instance.delete("person1");   
```

**Update operation**
```
let newValue = { age: 24, userId: 2345, city: "pune" };
instance.update("person1", newValue);
```
