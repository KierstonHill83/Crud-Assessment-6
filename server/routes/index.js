var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sports', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    var query = client.query("SELECT * FROM info ORDER BY id ASC;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.post('/sports', function(req, res) {
  var results = [];
  var data = {type: req.body.type, team: req.body.team};
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("INSERT INTO info(type, team) values($1, $2)", [data.type, data.team]);
    var query = client.query("SELECT * FROM info ORDER BY id ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.put('/sports/:sports_id', function(req, res) {
  var results = [];
  var id = req.params.sports_id;
  var data = {type: req.body.type, team: req.body.team};
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err }));
    }
    client.query("UPDATE info SET type=($1), team=($2) WHERE id=($3)", [data.type, data.team, id]);
    var query = client.query("SELECT * FROM info ORDER BY id ASC");
    query.on('row', function(row) {
      results.push(row);
    });
  });
});

router.delete('/sports/:sports_id', function(req, res) {
  var results = [];
  var id = req.params.sports_id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query("DELETE FROM info WHERE id=($1)", [id]);
    var query = client.query("SELECT * FROM info ORDER BY id ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


module.exports = router;
