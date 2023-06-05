const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
const aboutContent = "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const contactContent = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

var blogTitle = "";
var blogBody = "";
let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    StartingPosts: posts
  });
  // console.log(posts);
})

app.get("/about", function(req, res) {
  res.render("about", {
    StartingContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    StartingContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  const post = {
    Title: req.body.postTitle,
    content: req.body.postBody
  };
  // console.log(post);
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:anything", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.anything);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.Title);

    if(storedTitle === requestedTitle){
      res.render("posts",{
        title: post.Title,
        content: post.content
      });
    }
  });

})


app.listen(3000, function() {
  console.log("server started and running at port: 3000");
});
