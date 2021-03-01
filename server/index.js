const express = require('express'); // gives us access to express
const app = express(); //accentuate express into the server folder.

const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const bodyParser = require('body-parser'); // allows us to parse
const router = require('./app/routes/router');

// as an api gets bigger (Scales), do you have a file system that can scale instead of a 1000 lines in one index.js. Router is a way to make the api more flexiable without people 1000 lines of code in one file.

const PORT = 3070; //? Any connection to the react port of 3000 for local hos
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //parse json package that is sent back to our api.

//ALL ROUTES
app.get('/', (req, res) => {
  res.json({
    'All tickets': 'http://localhost:3075/api/tickets',
    'Find by priority': 'http://localhost:3075/api/priority',
    'Find by status': 'http://localhost:3075/api/status',
    'Find by departments': 'http://localhost:3075/api/departments',
  });
});

app.post('/update', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.post('/create', (req, res) => {
  console.log(req.body);

  res.json(req.body);
});

app.post('/delete/:id', (req, res) => {
  console.log(req.body);

  res.json(req.body);
});

app.use('/api', router); //this entire system only exist after /api. pre-fixed with
