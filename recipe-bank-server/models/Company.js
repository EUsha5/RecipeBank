const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Recipe     = require("./Recipe");
const User       = require("./User");


const companySchema = new Schema ({
  name: String,
  admin: String,
  recipes: [{type: Schema.Types.ObjectId, ref:"Recipe"}],
  employees: [{type: Schema.Types.ObjectId, ref: "User"}],
},
{timestamp: true}
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;