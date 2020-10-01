const express = require('express');
const dbConfig = require('../data/dbConfig');
const userDb = require('./userDb')

const router = express.Router();
////////////////////////////////////// post
router.post('/', (req, res) => {
  userDb.insert(req.body)
    .then((post) => {
      if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
      } else if (req.body.title&&req.body.contents) {
        dbConfig.insert(req.body)
        res.status(201).json(post)
      }
    })
});
/////////////////////////////////////////// post by id
router.post('/:id/posts', (req, res) => {
 
    let comment = req.body
    
    function isValidPost(post) {
        return Boolean(post.text && post.post_id);
    }

    if(isValidPost(post)){

        db.insertPost(post)
        .then (post => {
            res.status(201).json({post})
        })
        .catch(error => {res.status(500).json({error: "There was an error while saving the post to the database."})})
    } else {res.status(400).json({errorMessage: "Please provide text and id for the post."})}
})  

//////////////Get all
router.get('/', (req, res) => {
  userDb.get(req.query)
  .then(post => {
    res.status(200).json(post)
  .catch(error => {
    console.log(error)
    res.status(500).json({error: "The post information could not be retrieved."})
  })
  })
});
/////////////Get by ID
router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
  .then(post => {
    if(post){
      res.status(200).json(post)
    } else {res.status(404).json({message: "The post with the specified ID does not exist"})}
  })
});
/////////////Get post by ID
router.get('/:id/posts', (req, res) => {
  userDb.getUserPosts(req.params.id)
  .then(post => {
    if(!post){
      res.status(404).json({message: "The post with the specified ID does not exist"})
    } else if (post){res.status(200).json(post)}
  })
});
///////////////////////////////////////////
router.delete('/:id', (req, res) => {
  userDb.remove(req.params.id)
    .then(post => {
            if(post > 0){res.status(200).json({message: "The post has been deleted."})
            } else {res.status(404).json({message: "The post could not be found."})}
        })
        .catch( error => res.status(500).json({error: "The post could not be removed."}))
    
})

///////////////////////////////////////////
router.put('/:id', (req, res) => {
  router.put('/:id', (req, res) => {
    Hubs.update(req.params.id, req.body)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  });
});
///////////////////////////////////////////

//custom middleware
function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
    .then(user => {
      if(user){
        next()
      } else{res.status(200).json({message: "User not found"})}
    })
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: "Missing user data"})
  } else if (!req.body.name){
    res.status(400).json({message: "Missing required name field."})
  } else {next()}
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "Missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({message: "Missing required text field"})
  } else {next()}      
}

module.exports = router;
