const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const User       = require("./User");


const recipeSchema = new Schema ({
  name: String,
  ingrediants: Array,
  instructions: String,
  image: String,
  preptime: Number,
  author: {type: Schema.Types.ObjectId, ref:'User'},
},
{timestamp: true}
);




const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;



