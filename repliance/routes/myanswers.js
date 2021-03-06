var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

router.get('/', function(req, res) {

  var user = req.session.user;
	  if (user === undefined || online[user.uid] === undefined) {
	    req.flash('auth', 'Not logged in!');
	    res.redirect('/user/login');
	  }
	  else {
	  	dblib.userAns(user, function(error, data){
	  		if(user === undefined || online[user.uid] === undefined){
	  			req.flash('auth', 'Not logged in!');
	    		res.redirect('/user/login');
	  		}
	  		else{
	  			res.render('myanswers', {title : 'My Answers',
										  username : user.username,
										  data : data });
	  		}
	  	});
	  }
  });

module.exports = router;