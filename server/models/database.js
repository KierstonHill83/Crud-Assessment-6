var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sports';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE info(id SERIAL PRIMARY KEY, type VARCHAR not null, team BOOLEAN)');
query.on('end', function() { client.end(); });