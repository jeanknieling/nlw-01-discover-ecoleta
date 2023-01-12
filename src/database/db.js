const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/database/database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

  /* const query = `
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
    'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    'Papersider',
    'Guilherme Gemballa, Jardim América',
    'Número 260',
    'Santa Catarina',
    'Rio do Sul',
    'Resíduos Eletrônicos, Lâmpadas',
  ];

  function afterInsertData(err) {
    if (err) {
      return console.error(err);
    }

    console.log('Cadastrado com sucesso!', this);
  }
  db.run(query, values, afterInsertData);

  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    console.log('Aqui estão os seus registros', rows);
  });

  db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('Registro deletado com sucesso!');
  }); */
});

module.exports = db;
