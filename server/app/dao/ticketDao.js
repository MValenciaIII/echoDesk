const pool = require('../config/dbconfig');

class TicketDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  findAll(req, res) {
    // let sql = "SELECT * FROM movies where deleted_at is NULL"; // simple statement unless you have a lot of joins.
    let sql = 'SELECT * FROM tickets';
    // let sql = `SELECT t.id,  t.client_id, t.client_full_name, t.client_phone_number, t.client_email, t.subject, t.description, d.department, l.location, s.service,
    // from tickets t
    // join departments d ON c.department_id = d.id
    // join location l ON t.location_id = l.id 
    // join service s ON t.service_id = s.id ORDER BY c.id;`
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
    let sql = 'SELECT * FROM tickets where id= ?';
    // let sql = `SELECT t.id, c.fname, c.lname, c.email, c.mobile_phone, c.office_phone, c.title, d.department, l.location
    // from tickets t
    // join clients c ON t.client_id = c.id
    // join departments d ON c.department_id = d.id
    // join location l ON t.location_id = l.id
    // where t.id = ?;`;
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
  addFile(req, res, id) {
    // let sql = "SELECT * FROM movies where deleted_at is NULL"; // simple statement unless you have a lot of joins.
    // let sql = 'SELECT * FROM clients';
    let sql = `INSERT INTO files VALUES (0, 'test', ?);`
    this.pool.query(sql, [id], function (err, rows) {
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
  getFiles(req, res, id) {
    // let sql = "SELECT * FROM movies where deleted_at is NULL"; // simple statement unless you have a lot of joins.
    // let sql = 'SELECT * FROM clients';
    let sql = `SELECT * FROM files where ticket_id = ?;`
    this.pool.query(sql, [id], function (err, rows) {
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

  create(req, res) {
    // let sql = "SELECT * FROM movies where id= ?";
    let fields = Object.keys(req.body);
    // fields[ fields.indexOf('condition')] = 'condition'; //if i were using my cars database
    let values = Object.values(req.body);
    //Required Min Data
    if ( !req.body.client_id || !req.body.client_full_name || !req.body.department_id || !req.body.location_id || !req.body.client_phone_number || !req.body.subject || !req.body.service_id || !req.body.service_details_id || !req.body.status_id || !req.body.priority_id || !req.body.group_id || !req.body.agent_id || !req.body.description) {
        res.json({
            error: true,
            message: "ERROR! There is missing data in this form!",
        });
    }
    // res.json({ "here": "yo" });
    //dynamically. dont send in NULLS using this!
    let sql = `INSERT INTO tickets(${fields.join(",")})VALUES(${Array(
  values.length
)
  .fill("?")
  .join(",")});`;
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

  updateById(req, res) {
    let fields = Object.keys(req.body); // making dynamic. fields is now an array
    // fields[fields.indexOf('condition')] = 'condition'; //if i were using my cars database (for condition because condition is a reserve word in sql) : at position in the array, make equal to backtick array
    let values = Object.values(req.body); //making dynmical
  
    if (!req.params.id) {
        res.json({
            error: true,
            message: "Missing ID",
        });
    } else if (fields.length == 0) {
        res.json({
            error: true,
            message: "No fields to update",
        });
    }
  
    let sql = `UPDATE tickets set ${fields.join("=?,")}=? WHERE id =?`; //update the data!
    //have to put =? at the end of the join because join only add between things!
    console.log(sql);
  
    this.pool.query(sql, [...values, req.params.id], (err, rows) => {
        //... means SPREAD. It takes values from of array (in this instance).
        //did this method because, cant send id in body of values. if we didnt use params, then id would have to be passed in last. sent id as a "url param" and that seperated id for the body content.
  
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        }
        res.json(rows);
    });
  } 
}
module.exports = TicketDao;
