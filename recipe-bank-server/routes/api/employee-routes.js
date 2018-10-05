const express = require('express');
const User  = require('../../models/User');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/employees', (req, res, next) => {
  User.find()
  .then(allTheEmployees => {
    res.json(allTheEmployees);
  })
  .catch(err => {
    res.json(err);
  })
});

// PUT route => to update a specific employee
router.put('/employees/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findByIdAndUpdate(req.body._id)
    .then(() => {
      res.json({message: `Employee with ${req.body.id} is updated successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
});

module.export = router;
