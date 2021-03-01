const pool = require('../config/dbconfig');

class TicketDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  findAll(req, res) {
    // let sql = "SELECT * FROM movies where deleted_at is NULL"; // simple statement unless you have a lot of joins.
    let sql = 'SELECT * FROM movies';
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
    let sql = 'SELECT * FROM movies where id= ?';
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
}
module.exports = MovieDao;
