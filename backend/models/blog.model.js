import mongoose from "mongoose";

const blogSchema= new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    imageUrl:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number
    }
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema);