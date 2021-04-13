const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const bodyParser = require('body-parser'); // allows us to parse
const router = require('./app/routes/router');
//use express static folder
var publicDir = require('path').join(__dirname, './public/Images/');
app.use(express.static(publicDir));
app.use(bodyparser.json());
app.use( bodyparser.urlencoded({ extended: true,}));
app.use(cors());
const DIR = './public/Images/';
// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'memadev',
  database: 'echodeskdev',
});
db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});
// Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, DIR); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({
  storage: storage,
});


router.post('/post', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('No file upload');
  } else {
    // console.log(req.file.filename);
    // console.log(req.file.ticket_id)
    var imgsrc = 'http://localhost:4000/' + req.file.filename;
    console.log({imgsrc})
    // req.file.ticket_id = 19;
    console.log(req.body);
    console.log(req.body.ticket_id);
    var insertData = `INSERT INTO files SET file_name = ?, ticket_id = ?`;
    db.query(insertData, [imgsrc, req.body.ticket_id], (err, result) => {
      if (err) throw err;
      console.log('file uploaded');
      res.send({
        "code": 200,
        "success": "file uploaded successfully."
    })
    });
  }
  console.log(req.body)
});

const PORT = 4000; //? Any connection to the react port of 3000 for local hos
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

//ALL ROUTES
app.get('/', (req, res) => {
  res.json({
    'All tickets': 'http://localhost:4000/api/tickets',
    'Find by priority': 'http://localhost:4000/api/priority',
    'Find by status': 'http://localhost:4000/api/status',
    'Find by departments': 'http://localhost:4000/api/departments',
    'Find by details': 'http://localhost:4000/api/details',
    'Find by service': 'http://localhost:4000/api/service',
    'Find by location': 'http://localhost:4000/api/location',
  });
});

app.use('/api', router); //this entire system only exist after /api. pre-fixed with


