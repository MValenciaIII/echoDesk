const daoClass = require('../../dao/ticketDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();

// const pool = require('../../config/dbconfig');
const express = require('express');
const router = express.Router();

//root route: /api/tickets/ - the last '/' is what the '/' is referring too. everything before it is already pre-fixed.

//ALL TICKETS ROUTES ->> /api/tickets/
router.get('/', async (req, res) => {
  dao.findAll(req, res);
});

//FIND BY ID ROUTES ->> /api/tickets/:id
router.get('/:client_id', async(req, res) => {
  console.log(req.body);
  dao.findbyID(req, res, req.params.client_id);
});

router.post('/update/:id', (req, res) => {
  console.log(req.body);

  //res.json(req.body);
  dao.updateById(req, res);
});

// /api/movies/create
router.post('/create', (req, res) => {
  console.log(req.body);

  //res.json(req.body);
  dao.create(req, res);
});

router.get('/:id/addFile', (req, res) => {
  console.log(req.body);
  dao.addFile(req, res, req.params.id);
});
router.get('/:id/getFiles', (req, res) => {
  console.log(req.body);
  dao.getFiles(req, res, req.params.id);
});
router.get('/delete/:id', (req, res) => {
  console.log(req.body);
  //res.json(req.body);
  dao.deletebyID(req, res, req.params.id);
});
  
module.exports = router;