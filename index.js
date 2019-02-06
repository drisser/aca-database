var http = require('http');
let server = http.createServer(messageReceived);
server.listen(8080);
let {show, find, create} = require("./database");


function messageReceived(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.method === "GET" && req.url === "/users"){
      show("users",(users)=>{
        res.write(JSON.stringify(users));
        res.end();
      })
    }
    else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
      let id = req.url.split("/");
      id = Number(id[2]);
      find("users",id,(user)=>{
        res.write(JSON.stringify(user));
        res.end(); 
      })
    }
    else if(req.method === "POST" && req.url === "/users"){
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          let user = JSON.parse(body);
          user._id = users.length + 1;
          create(user);         
          res.end();
        });
    }
    else{
     res.write("Not Found");
     res.end();
    }
    
}

