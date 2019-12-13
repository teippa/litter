var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.app.get("defaultUser");
  res.cookie('token_username', username, {expires: new Date(Date.now() + 8 * 3600000)})
  
  res.render('index', { username: username });
});


router.post('/login', function(req, res, next) {
  var username = req.body.username  || req.app.get("defaultUser");
  //var title = req.body.title;
  console.log(username)
  res.cookie('token_username', username, {expires: new Date(Date.now() + 8 * 3600000)})
  
  res.redirect("/posts")
});


module.exports = router;
