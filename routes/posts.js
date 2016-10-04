var express = require("express");
var router = express.Router();
var Post = require("../models/Post");

//Index
router.route("/").get(function(req,res){
  Post.find({}, function(err, posts){
    if(err) return res.json(err);
    res.render("posts/index", {posts:posts});
  });
});

//New
router.route("/new", function(req, res){
  res.render("posts/new");
});

//creat
router.route("/", function(req, res){
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});

//show
router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("posts/show", {post:post});
  });
});

//edit
router.get("/:id/edit", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("posts/edit", {post:post});
  });
});

//update
router.get("/:id", function(req, res){
  req.body.updatedAt = Date.now();
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/" + req.params.id);
  });
});

//destroy
router.delete("/:id", function(req, res){
  Post.remove({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});

module.exports = router;