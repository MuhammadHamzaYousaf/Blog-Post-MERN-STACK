const mongoose =require('mongoose');

const CategoreisSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }

},{timestamps:true});

const Category =new mongoose.model("Category",CategoreisSchema);
module.exports = Category;