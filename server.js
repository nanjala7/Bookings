const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // create a router for the db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});