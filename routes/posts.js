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
  var filteredUser = req.body.userFilter;
  //console.log(username);
  
  console.log(username)

  db.get()
    .collection("posts")
    .find()
    .limit(100)
    .toArray()
    .then(function(data) {
      var fData = data;
      if (filteredUser) {
        fData = data.filter((d)=> {
          return d.author == filteredUser;
        })//*/
      }
      fData.reverse();
      res.render("posts", { title: "Every trash", post_list: data , username: username});
    })
    .catch(error => {
      console.log(error);
    });
  //Above is example of ES6 function def; it is functionally similar to the then function
});



// Sanitation middleware
// See https://express-validator.github.io/docs/sanitization-chain-api.html
// And https://express-validator.github.io/docs/filter-api.html
router.post(
  "/search",
  function(req, res, next) {
    try{
      var username = req.cookies.token_username;
    } catch {
      res.redirect("/");
    }
    //res.redirect("/posts")
    
    var filteredUser = req.body.userFilter;


    if (!filteredUser) {
      res.redirect('/posts');
    }/* else if (filteredUser === 'clearDB') {
      db.get().collection("posts").drop();
      res.redirect('/posts');
    }//*/

    db.get()
    .collection("posts")
    .find({author: filteredUser})
    .limit(100)
    .toArray()
    .then(function(data) {
      var fData = data;
      /*if (filteredUser) {
        fData = data.filter((d)=> {
          return d.author == filteredUser;
        })
      }*/
      //console.log(fData);
      fData.reverse();
      res.render("posts", { title: filteredUser+"'s posts", post_list: fData , username: username});
    })
    .catch(error => {
      console.log(error);
    });//*/
  }
);



module.exports = router;
