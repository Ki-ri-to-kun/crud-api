import {v4 as uuid} from 'uuid';

export const users = [
  {id: uuid(), username: 'John', age: 20, hobbies: ['play games', 'sleep']},
  {id: uuid(), username: 'Pete', age: 30, hobbies: ['walk', 'pay taxes']},
  {id: uuid(), username: 'Bob', age: 40, hobbies: ['play guitar', 'drink vodka']},
  {id: uuid(), username: 'Clare', age: 20, hobbies: ['cooking', 'marry']},
];

