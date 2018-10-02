const express    = require('express');
const authRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User       = require('../../models/User');
const Company = require('../../models/Company');

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const companyName = req.body.name;
  const role = req.body.role;

  if(!username || !password) {
    console.log(req.body)
    res.status(400).json({message: 'Please enter Username and Password'});
    return;
  }
  if(password.length < 8) {
    res.status(400).json({message: 'Please enter an 8 digit password'});
  }
  User.findOne({ username }, (err, foundUser) => {
    if(err){
        res.status(500).json({message: "Username check went bad."});
        return;
    }
    if (foundUser) {
        res.status(400).json({ message: 'Username taken. Choose another one.' });
        return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
        username:username,
        password: hashPass,
        role: role
    });
    console.log(aNewUser)
    if(req.body.role !== 'Chef'){
        console.log('_)_)_)_)_)_))__', req.body.role)
        Company.findByIdAndUpdate(req.body.companyID, {$push:{ employees: aNewUser._id}})
        .then((response) => {
            console.log(' this is the respoonse after updating the company ><><><><><><><><><><', response)
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })
    } else {
        Company.create({
            name: companyName,
        })
        .then((response) => {
            console.log(' fuck off-==--=-=-=-=-=-', response)
        })
            .then((response) => {
                Company.findByIdAndUpdate(req.body.companyID, {$push:{ employee: response._id }})
            })
            .catch((err) => {
                res.json(err)
            })
        .catch ((err) => {
            res.json(err)
        })
    }
});
});

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }  
      if (!theUser) {
          // "failureDetails" contains the error messages
          // from our logic in "LocalStrategy" { message: '...' }.
          res.status(401).json(failureDetails);
          return;
      }
      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }
          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});


authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});



module.exports = authRoutes;