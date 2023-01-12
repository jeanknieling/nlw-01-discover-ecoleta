const express = require('express');
const nunjucks = require('nunjucks');

// pegar o banco de dados
const db = require('./database/db');

const server = express();
// habilita o req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

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

server.post('/create-point', (req, res) => {
  // inserir dados no banco de dados
  const query = `
  INSERT INTO places (
    image, 
    name, 
    address, 
    address2, 
    state, 
    city, 
    items
  ) values (?, ?, ?, ?, ?, ?, ?);
`;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.error(err);

      return res.send('Erro no cadastro!');
    }

    console.log('Cadastrado com sucesso!', this);
    return res.render('create-point.html', { registered: true });
  }
  db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {
  const { search } = req.query;

  if (search === '') {
    return res.render('search-results.html', { totalPlaces: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    const totalPlaces = rows.length;

    return res.render('search-results.html', { places: rows, totalPlaces });
  });
});

const port = 3333;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
