const express    = require('express');
const authRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User       = require('../../models/User');
const Company    = require('../../models/Company');

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const companyName = req.body.companyName;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
console.log('=-=-=-=-=-=-=-', req.body)
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
        password:hashPass,
        firstname:firstName,
        lastname:lastName,
        companyName:companyName,
        
    });
    User.create(aNewUser)
    .then((theUserResponse) => {
        let userID = theUserResponse._id;
        console.log('1- after creating a new user line 47',theUserResponse)
        if(req.body.role === 'Chef'){
            Company.findByIdAndUpdate(req.body.companyID, {$push:{ employees: aNewUser._id}})
            .then((response) => {
                console.log('2-response after finding the company and saviong the user id line 51', response)
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
        } else {
           Company.findOne({name: req.body.companyName})
           .then(companyFromDB => {
               console.log('3- response fandin the company name line 60',companyFromDB)
            //    console.log('here we should see the company name',companyFromDB )
               if(companyFromDB === null) {
                Company.create({
                    companyName: companyName
                })
                .then((response) => {
                    console.log('4- response after creating the company  if the name dosnt exist line 67',response)
                //    findByIdAndUpdate(response._id, {$push:{employees: userID}})
                    response.employees.push(userID);
                    response.save()
                    .then(thisIsAResponse => {
                        console.log("f5- this the response after puahing the employ in the employee array of the company", thisIsAResponse);
                        res.json(thisIsAResponse);
                    })
                    .catch(err => {
                        res.json(err);
                    })
                })
                .catch ((err) => {
                    res.json(err)
                })
               } else {
                   res.json({message: "Company name already in use pig fucker!"})
               }
           })
            
        }
    })
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
  //req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});



module.exports = authRoutes;