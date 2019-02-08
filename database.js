let fs = require("fs");

exports.show = function(type,doneCallback){
  fs.readFile("db.json", (err,data)=>{
    let allTheStuff = JSON.parse(data);
    //allTheStuff = {}
    let users = allTheStuff[type];
    doneCallback(users);
  })
}

exports.find = function(type,id,doneCallback){
    //type = "users"
    fs.readFile("db.json", (err,data)=>{
        let allTheStuff = JSON.parse(data);
        //allTheStuff = {}
        let users = allTheStuff[type];
        let user = users.find(u=>u.id === id);
        doneCallback(user);
    })
}

exports.create = function(type,data,doneCallback){
  //type = "users"
  fs.readFile("db.json", (err,data)=>{
    let allTheStuff = JSON.parse(data);
    //allTheStuff = {}
    allTheStuff[type].push(data)
    
    let thingsAsString = JSON.stringify(allTheStuff)
    fs.writeFile("db.json", thingsAsString, function(){
        doneCallback(data);
    })    
  })
}

