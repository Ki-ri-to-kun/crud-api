import {v4 as uuid} from 'uuid'; //^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$

import {users} from './data';
import {IUser} from './models/User';


export const getAllUsers = (res: any) => {
  res.end(JSON.stringify(users));
};

export const getUserById = (id: string, res: any) => {
  const user = users.find((u) => u.id === id);
  if(user){
     res.end(JSON.stringify(user));
  } else {
     userNotFound(res);
  }
};

export const createUser = (data: Buffer, res: any) => {
  const userData = JSON.parse(data.toString());
  const newUser = {
    id: uuid(),
    ...userData
  };
  users.push(newUser);
  res.statusCode = 201;
  res.end(JSON.stringify(newUser));
};

export const updateUser = (id: string, data: Buffer, res: any) => {
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
    userNotFound(res);
  }
};

export const deleteUser = (id: string, res: any) => {
  const index = users.findIndex((user) => user.id === id);
    
  if(index !== -1){
    users.splice(index, 1);
    res.statusCode = 204;
    res.end();
  } else {
    userNotFound(res);
  }
};

export const userNotFound = (res: any) => {
  res.statusCode = 404;
  res.end('404 - User Not Found');
};

export const internalServerError = (res: any) => {
  res.statusCode = 500;
  res.end('500 - Internal Server Error');
};