const daoClass = require('../../dao/fileDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();
const express = require('express');
const app = express();
const router = express.Router();
// const create = require("../../middleware/upload");
// app.use(express.static("./Images"));


//GET ALL FILE ROUTES 
router.get('/', (req, res) => {
  dao.findAll(req, res);
});


// router.post("/create", (req, res) => {
//   console.log(req.body);
//     dao.create(req, res);
//       // var insertData = "INSERT INTO file(file_src)VALUES(?)"
//       // db.query(insertData, [imgsrc], (err, result) => {
//       //     if (err) throw err
//       //     console.log("file uploaded")
//       // })
//   }
// );


// router.post("/create", (req, res) => {
//   dao.create(req, res, function (err) {
//     if (!req.file) {
//       console.log("No file upload");
//   } else {
//       console.log(req.file.filename)
//       var imgsrc = 'http://locahost:3095/api/filess' + req.file.filename
//       var insertData = "INSERT INTO files(file_name)VALUES(?)"
//       db.query(insertData, [imgsrc], (err, result) => {
//           if (err) throw err
//           console.log("file uploaded")
//       })
//   }
//     // Everything went fine 
//   })
// });



//FIND A FILE ROUTE BY ID
// router.get('/:id', (req, res) => {
//   dao.findbyID(req, res, req.params.id);
// });

// //CREATE FILE ROUTE
// router.post('/create', (req, res) => {
//   console.log(req.body);
//   dao.create(req, res);
// });


// //UPDATE FILE ROUTE.
// router.post("/update/:id", (req, res) => {
// console.log(req.body);
// dao.updateById(req, res);
// });


module.exports = router;