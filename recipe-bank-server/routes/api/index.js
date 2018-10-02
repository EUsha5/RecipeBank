const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

// authRoutes.post('/signup', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if(!username || !password) {
//     console.log(req.body)
//     res.status(400).json({message: 'Please enter Username and Password'});
//     return;
//   }
//   if(password.length < 8) {
//     res.status(400).json({message: 'Please enter an 8 digit password'});
//   }
//   User.findOne({ username }, (err, foundUser) => {
//     if(err){
//         res.status(500).json({message: "Username check went bad."});
//         return;
//     }
//     if (foundUser) {
//         res.status(400).json({ message: 'Username taken. Choose another one.' });
//         return;
//     }

//     const salt     = bcrypt.genSaltSync(10);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const aNewUser = new User({
//         username:username,
//         password: hashPass
//       });
//       console.log(response)
//     if(response.role !== 'Chef'){
//         Company.findByIdAndUpdate(req.body.companyID, {$push:{ employee: response._id }})
//         .then((response) => {
//             res.json(response)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
//     } else {
//         Company.create({
//             name: req.body.name,
//         })
//         .then((response) => {
//             aNewUser.save(err => {
//                 if (err) {
//                     res.status(400).json({ message: 'Saving user to database went wrong.' });
//                     return;
//                 }
//                 req.login(aNewUser, (err) => {
//                     if (err) {
//                         res.status(500).json({ message: 'Login after signup went bad.' });
//                         return;
//                     }        
//                     // We can use also: res.status(200).json(req.user);
//                     res.status(200).json(aNewUser);
//                 });
//             });
//         })
//             .then((response) => {
//                 Company.findByIdAndUpdate(req.body.companyID, {$push:{ employee: response._id }})
//             })
//             .catch((err) => {
//                 res.json(err)
//             })
//         .catch ((err) => {
//             res.json(err)
//         })
//     }
// });
// });