const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
server.use(express.json());

server.use(express.static('public'));

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

/* server.get('/', (req, res) => {
  return res.sendFile(__dirname + '/views/index.html'); // Maneira de devolver o arquivo antes da instalação do "nunjucks".
}); */

server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

server.get('/search', (req, res) => {
  return res.render('search-results.html');
});

const port = 3333;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
