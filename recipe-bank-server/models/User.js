const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Company    = require('./Company');

const userSchema = new Schema ({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
  role:  String,
  email: String,
  company: {type: Schema.Types.ObjectId, ref: "Company"},
},
{timestamp: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;