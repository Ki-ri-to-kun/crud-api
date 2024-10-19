import 'dotenv/config';
import http from 'http';
import {v4 as uuid} from 'uuid';

import {users} from './data.js';

const server = http.createServer((req, res) => {
  const urlPaths = req.url.split('/');
  urlPaths.splice(0, 1);
    
  if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && req.method === 'GET'){
    
    // get user by id
    if(urlPaths.length === 3){
      const id = urlPaths[2];
      const user = users.find((u) => u.id === id);
      if(user){
        res.end(JSON.stringify(user));
      } else {
        res.statusCode = 404;
        res.end('404 - Not Found');
      }
    // get all users
    } else if(urlPaths.length === 2){
       res.end(JSON.stringify(users));
    } else {
      res.statusCode = 404;
      res.end('404 - Not Found');
    }
  } else if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && req.method === 'POST'){
    
    req.on('data', (data) => {
      const userData = JSON.parse(data.toString());
      const newUser = {
        id: uuid(),
        ...userData
      };
      users.push(newUser);
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    });
    
  } else if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && urlPaths.length === 3 && req.method === 'PUT'){
    
      req.on('data', (data) => {
         const id = urlPaths[2];
         const newUser = JSON.parse(data.toString());
         const index = users.findIndex((user) => user.id === id);
         
         if(index !== -1){
            const currentUser = users[index];
            const updatedUser = {
              ...currentUser,
              ...newUser
            };
            users[index] = updatedUser;
            res.end(JSON.stringify(updatedUser));   
         } else {
            res.statusCode = 404;
            res.end('404 - Not Found');
        }
      });

  } else if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && urlPaths.length === 3  && req.method === 'DELETE'){
    const id = urlPaths[2];
    
    const index = users.findIndex((user) => user.id === id);
    
     if(index !== -1){
        users.splice(index, 1);
        res.statusCode = 204;
        res.end();
     } else {
            res.statusCode = 404;
            res.end('404 - Not Found');
     }
  
  } else {
    res.statusCode = 404;
    res.end('404 - Not Found');
  }
  
});

server.listen(process.env.PORT, () => {
  console.log('server running');
});