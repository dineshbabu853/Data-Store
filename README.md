# Key Value Data-Store   
This is a file based Key value data store built using **node js**    
Note : This project is published to npm on 01.01.2021       

## *Core Functionalities*
1. Supports CREATE , READ , DELETE and UPDATE operation   
2. Restricts key size to 32 chars and value size to 16KB   
3. Allows client to instantiate the class and work on   
4. File can be created using optional file path , if it is not provided it will be created in current working directory   
5. Allows only one client to access file at any given time in a computer   
6. Every key will have a optional timeToLive property   
7. Uses Singleton approach   
8. Thread safe   

## *Steps to run this project locally:*
1. run ```npm i``` to install dependencies   
2. run ```npm start``` to run the application [ This will run the sample client file provided in the repo ]    
3. run ```npm test``` to run tests

## *Usage*
**Import the data store**    
```
let dataStore = require("data-store-local")     
```

**Creating an instance for the dataStore**    
This takes two arguments *clientId* and *file path(optional)*    
*note:* `clientId` is a four digit number provided by user, it restricts the file access to only one client process at any given time in a computer    
```
let clientId = 2343; //sample clientId
let myDataStore = new dataStore(clientId);
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
let myValue = instance.get("person1");    
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
