
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  
  models.Post.findAll({
    include: [ models.Comment ]
  }).then(function(posts) {
    if (posts == null){
      posts = [];
    }

    res.render('index', {
      posts: posts,
    });
  });
});

router.post('/add/', function(req, res) {

  models.Post.create({ name: req.body.name, text: req.body.text});
  res.redirect('/');

});

router.post('/add-comment/', function(req, res) {

  models.Comment.create({ name: req.body.name, text: req.body.text, PostId: req.body.postid});
  res.redirect('/');

});

router.get('/delete/:id', function(req, res) {

  models.Post.destroy({
    where: {
        id: req.params.id
    }
  });
  res.redirect('/');

});

router.get('/delete-comment/:id', function(req, res) {

  models.Comment.destroy({
    where: {
        id: req.params.id
    }
  });
  res.redirect('/');

});

module.exports = router;
