// Required libraries
var express = require("express");
var router = express.Router();

// Get the db instance
var db = require("../db");

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

// Get posts listing
router.get("/", function(req, res, next) {
  // Getting content from Mongo
  // Collection first
  try{
    var username = req.cookies.token_username;
  } catch {
    res.redirect("/");
  }
  //console.log(username);
  
  console.log(username)

  db.get()
    .collection("posts")
    .find()
    .limit(100)
    .toArray()
    .then(function(data) {
      //console.log(data);
      var fData = data.filter((d)=> {
        return d.author == username;
      })//*/
      fData.reverse();
      res.render("user", { title: "Your trash", post_list: fData , username: username});
    })
    .catch(error => {
      console.log(error);
    });
  //Above is example of ES6 function def; it is functionally similar to the then function
});


const toDateStr = (i) => {
  return i<10 ? '0'+i : i;
}
// Sanitation middleware
// See https://express-validator.github.io/docs/sanitization-chain-api.html
// And https://express-validator.github.io/docs/filter-api.html
router.post(
  "/newPost",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    try{
      var username = req.cookies.token_username;
    } catch {
      res.redirect("/");
    }
    var local_content = req.body.content;

    if (!local_content) {
      res.redirect("/user");
    } else {

      var now = new Date();
      var D = toDateStr(parseInt(now.getDate()));
      var M = toDateStr(parseInt(now.getMonth())+1);
      var Y = toDateStr(parseInt(now.getFullYear()));
      var h = toDateStr(parseInt(now.getHours()));
      var m = toDateStr(parseInt(now.getMinutes()));
      var nowStr = D +'.'+ M +'.'+ Y +' '+ h +':'+ m;
      
      console.log("We got content: " + local_content);
      console.log("from username: " + username);
      console.log("On: " + nowStr);

      db.get()
        .collection("posts")
        .insertOne({ content: local_content, author: username, timeStr: nowStr, timeStamp: now })
        .then(function() {
          console.log("Inserted 1 object");
          res.redirect("/user");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
);



module.exports = router;
