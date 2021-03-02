const pool = require('../config/dbconfig');

class UserDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  findAll(req, res) {
    // let sql = "SELECT * FROM movies where deleted_at is NULL"; // simple statement unless you have a lot of joins.
    let sql = 'SELECT * FROM clients';
    // let sql = `SELECT m.id, m.title, m.year, d.fname, d.lname, g.genre, m.rating, m.format, m.runtime, m.tagline,m.picture, m.description
    // from movies m
    // join directors d ON m.director_id = d.id
    // join genres g ON m.genre_id = g.id ORDER BY m.id;`;
    this.pool.query(sql, function (err, rows) {
      if (err) {
        res.json({
          //error and message suppose to look like: "error", "message". It works withou
          error: true,
          message: err,
        });
      }
      res.json(rows);
    });
  }
  findbyID(req, res, id) {
    let sql = 'SELECT * FROM clients where id= ?';
    this.pool.query(sql, [id], function (err, rows) {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      }
      res.json(rows[0]);
    });
  }
  create(req, res) {
    // let sql = "SELECT * FROM movies where id= ?";
    let fields = Object.keys(req.body);
    // fields[ fields.indexOf('condition')] = 'condition'; //if i were using my cars database
    let values = Object.values(req.body);
    //Required Min Data
    if (
      !req.body.fname ||
      !req.body.lname ||
      !req.body.email ||
      !req.body.mobile_phone ||
      !req.body.office_phone ||
      !req.body.location ||
      !req.body.title ||
      !req.body.department_id ||
      !req.body.id
    ) {
      res.json({
        error: true,
        message: 'ERROR! There is missing data in this form!',
      });
    }
    // res.json({ "here": "yo" });
    //dynamically. dont send in NULLS using this!
    let sql = `INSERT INTO clients(${fields.join(',')})VALUES(${Array(
      values.length
    )
      .fill('?')
      .join(',')});`;
    this.pool.query(
      sql,
      values, //req.body.title, req.body.year, req.body.director_id, req.body.genre_id
      (err, rows) => {
        if (err) {
          res.json({
            error: true,
            message: err,
          });
        }
        res.json(rows);
      }
    );
  }
}
module.exports = UserDao;
