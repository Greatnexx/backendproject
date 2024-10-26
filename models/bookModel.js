import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    publicationYear:{type:Number,required:true},
    description:{type:String},
    rating:{type:Number}

})

const Book = mongoose.model('Book',bookSchema);
export default Book;