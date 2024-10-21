//import 'dotenv/config'; 

import http from 'http';

import {users} from './data';
import * as UsersController from './users.controller';

const server = http.createServer((req: any, res) => {
  const urlPaths = req.url.split('/');
  urlPaths.splice(0, 1);
    
  if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && req.method === 'GET'){
   try {
      if(urlPaths.length === 3){
        UsersController.getUserById(urlPaths[2], res);
      } else if(urlPaths.length === 2){
        UsersController.getAllUsers(res);
      } else {
        UsersController.userNotFound(res);
      }
   } catch(err){
      UsersController.internalServerError(res);
   }
    
  } else if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && req.method === 'POST'){
    req.on('data', (data: Buffer) => {
      try{
         UsersController.createUser(data, res);
      } catch(err){
         UsersController.internalServerError(res);
      } 
    });
    
    req.on('error', (error: Error) => {
      UsersController.internalServerError(res);
    });
    
  } else if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && urlPaths.length === 3 && req.method === 'PUT'){
      req.on('data', (data: Buffer) => {
        try{
          UsersController.updateUser(urlPaths[2], data, res);
        } catch(err){
          UsersController.internalServerError(res);
        }
      });
      
     req.on('error', (error: Error) => {
        UsersController.internalServerError(res);
     });

  } else if(urlPaths[0] === 'api' && urlPaths[1] === 'users' && urlPaths.length === 3  && req.method === 'DELETE'){
    try {
      UsersController.deleteUser(urlPaths[2], res);
    } catch(err){
      UsersController.internalServerError(res);
    }
  
  } else {
    UsersController.userNotFound(res);
  }
});

server.listen(process.env.PORT, () => {
  console.log('server running');
});