import {v4 as uuid} from 'uuid';
import {users} from './data.js';


export const getAllUsers = (res) => {
  res.end(JSON.stringify(users));
};

export const getUserById = (id, res) => {
  const user = users.find((u) => u.id === id);
  if(user){
     res.end(JSON.stringify(user));
  } else {
     userNotFound(res);
  }
};

export const createUser = (data, res) => {
  const userData = JSON.parse(data.toString());
  const newUser = {
    id: uuid(),
    ...userData
  };
  users.push(newUser);
  res.statusCode = 201;
  res.end(JSON.stringify(newUser));
};

export const updateUser = (id, data, res) => {
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

export const deleteUser = (id, res) => {
  const index = users.findIndex((user) => user.id === id);
    
  if(index !== -1){
    users.splice(index, 1);
    res.statusCode = 204;
    res.end();
  } else {
    userNotFound(res);
  }
};

export const userNotFound = (res) => {
  res.statusCode = 404;
  res.end('404 - User Not Found');
};

export const internalServerError = (res) => {
  res.statusCode = 500;
  res.end('500 - Internal Server Error');
};