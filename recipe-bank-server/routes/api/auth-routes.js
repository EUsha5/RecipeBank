const express    = require('express');
const authRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User       = require('../../models/User');
const Company    = require('../../models/Company');

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.company;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
console.log('=-=-=-=-=-=-=-', req.body)
  if(!username || !password) {
    console.log("enter a username and pw @@@@@@@@@@@@@@@@@@ ", req.body)
    res.status(400).json({message: 'Please enter Username and Password'});
    return;
  }
  if(password.length < 8) {
      console.log("pw not long enough **************** ");
    res.status(400).json({message: 'Please enter an 8 digit password'});
  }
  User.findOne({ username }, (err, foundUser) => {
    if(err){
        res.status(500).json({message: "Username check went bad."});
        return;
    }
    if (foundUser) {
        console.log("the user name has been taken %%%%%%%%%%%%%%%%%% ");
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
        email:email,
        
    });
    console.log(">>>>>>>>>>>>>> Creating User <<<<<<<<<<<<<<<< ", aNewUser);
    User.create(aNewUser)
    // aNewUser.save()
    .then((theUserResponse) => {
        // let userID = theUserResponse._id;
        // console.log('1- after creating a new user line 47',theUserResponse)
        // if(req.body.role === 'Chef'){
        //     Company.findByIdAndUpdate(req.body.companyID, {$push:{ employees: aNewUser._id}})
        //     .then((response) => {
        //         console.log('2-response after finding the company and saviong the user id line 51', response)
        //         res.json(response)
        //     })
        //     .catch((err) => {
        //         res.json(err)
        //     })
        // }
        // } else {
        //    Company.findOne({name: req.body.company})
        //    .then(companyFromDB => {
        //        console.log('3- response fandin the company name line 60',companyFromDB)
        //     //    console.log('here we should see the company name',companyFromDB )
        //        if(companyFromDB === null) {
        //         Company.create({
        //             company: company
        //         })
        //         .then((response) => {
        //             console.log('4- response after creating the company  if the name dosnt exist line 67',response)
        //         //    findByIdAndUpdate(response._id, {$push:{employees: userID}})
        //             response.employees.push(userID);
        //             response.save()
        //             .then(thisIsAResponse => {
        //                 console.log("f5- this the response after puahing the employ in the employee array of the company", thisIsAResponse);
        //                 res.json(thisIsAResponse);
        //             })
        //             .catch(err => {
        //                 res.json(err);
        //             })
        //         })
        //         .catch ((err) => {
        //             res.json(err)
        //         })
        // //        } else {
        //            res.json({message: "Company name already in use pig fucker!"})
        //        }
        res.json(theUserResponse);
           })
            
        // }
    })
    .catch(err => {
        res.json(err);
    })
});
// });

authRoutes.post("/login", (req,res, next) => {
    console.log("LOG IN RIGHT NOW OR I WILL BREAK SHIT!!!!!!!!!!!!!!!!!!", req.body);
    User.findOne({ username: req.body.username })
    .then((userFromDb) => {
        console.log('##################', userFromDb);
      if (userFromDb === null) {
        res.json({message: "incorrect username"});
        return;
      }
      const isPasswordGood =
       bcrypt.compareSync(req.body.password, userFromDb.password);
  
       if (isPasswordGood === false) {
         res.json({message: "incorrect password"});
         return;
       }
        req.login(userFromDb, (err) => {
          if (err) {
            res.json(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
  });

// authRoutes.post('/login', (req, res, next) => {
//     console.log("LOG IN RIGHT NOW OR I WILL BREAK SHIT!!!!!!!!!!!!!!!!!!", req.body);
//     passport.authenticate('local', (err, theUser, failureDetails) => {
//         console.log("attempting to log in on the server side <<<<<<<<<<<<<<<<<<< ", theUser);
//       if (err) {
//           console.log("first err ---------------- ", err);
//           res.status(500).json({ message: 'Something went wrong authenticating user' });
//           return;
//       }  
//       if (!theUser) {
//           // "failureDetails" contains the error messages
//           // from our logic in "LocalStrategy" { message: '...' }.
//           res.status(401).json(failureDetails);
//           return;
//       }
//       // save user in session
//       req.login(theUser, (err) => {
//           console.log("the user info after log in ######################### ", theUser);
//           if (err) {
//             console.log("second err ===================== ", err);
//               res.status(500).json({ message: 'Session save went bad.' });
//               return;
//           }
//           // We are now logged in (that's why we can also send req.user)
//           res.status(200).json(theUser);
//       });
//   })
// });


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