const mongoose = require('mongoose');
 
const noteScheme = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        minlength:[3,'title should be at least 3 character long'],
        maxlength:[50,'Title cannot exeed 50 character']
    },
    content:{
        type:String,
        required:[true,"content is required"],
        minlength:[10,'Content should be at least 10 character long'],
        maxlength:[1000,"Content cannot exceed 1000 character"]
       
    },
    createdAt:{
            type:Date,
            default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
});
module.exports= mongoose.model('Note',noteScheme)