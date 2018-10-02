const express = require('express');
const Recipes  = require('../../models/Recipe');
const router = express.Router();
const mongoose = require('mongoose');



router.post('/recipes/create', (req, res, next) => {
  Recipes.create({
    name : req.body.name,
    image : req.body.image,
    preptime : req.body.preptime,
    ingrediants : req.body.ingrediants,
    instruction: req.body.instruction,
    author: req.user._id,
  })
  .then (response => {
    res.json(response);
    console.log(response);
  })
  .catch(err => {
    res.json(err);
  })
});


// GET route => to get all the recipes
router.get('/recipes', (req, res, next) => {
  Recipes.find().populate('author')
    .then(allTheRecipes => {
      res.json(allTheRecipes);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific recipe/detailed view
router.get('/recipes/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
                                   
  Recipes.findById(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// PUT route => to update a specific recipe
router.put('/recipes/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Recipes.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({message: `Recipe with ${req.params.id} is updated successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
});

router.delete('/recipes/:id', (req, res, next)=>{ 
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Recipes.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({message: `Recipe with ${req.params.id} is removed successfully.`});
    })
    .catch( err => {
      res.json(err);
    })
})







module.exports = router;