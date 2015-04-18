var pg = require('pg');

var cstr = 'postgres://postgres:postgres@localhost/repliance';

/**
 * This function adds a user to the database.
 */
function add(user, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'insert into users values(' +
							user.uid + ',\'' +
							user.username + ',\''
							user.password + '\',\'' +
							user.fname + '\',\'' +							
							user.lname + '\',' +
							user.score + ')';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if (err) {
					cb(err);
				}
			});
		}
	});
}

/**
 * This function looks up a particular user in the databse (login/authentication)
 */

function lookup(username, password, cb) {
	console.log("Real database lookup invoked");
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'select * from users where username = \'' + username + '\'';
			console.log(qstring);
			client.query(qstring, function(err, result) {
				console.log(result.rows);
				done();
				client.end();
				if (err) {
					console.log("error in index.js");
					cb(err);
				}
				else{
					console.log("Else...");
					if (result.rows !== undefined){
						console.log("If...");
						if((result.rows[0].password === password) && (result.rows[0].username === username)){
							console.log("user correct info");
							cb(undefined, result.rows[0]);
						}
					}
				}
			});
		}
	});
}

/**
 * This function returns a list of all users in the database.
 */
function list(cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			client.query('select * from users', function(err, result) {
				done();
				client.end();
				if (err) {
					cb(err);
				}
				else {
					cb(result.rows);
				}
			});
		}
	});
}

/**
* 
 */
function accountInfo(user, cb){

	pg.connect(cstr, function(err, client, done){

		if(err){
			cb(err);
		}
		else{
			client.query(('select * from users where uid=' + user), function(err, result){
				done();
				client.end();
				if (err){
					cb(err);
				}
				else{
					cb(result.rows);
				}
			});
		}
	});
}


module.exports = {
  add     	: add,
  lookup	: lookup,
  list    	: list,
};