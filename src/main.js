import http from 'http';

const server = http.createServer((req, res) => {
  res.end('server answer');
  
});

server.listen(3000, () => {
  console.log('server running');
});