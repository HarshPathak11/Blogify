import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }],
    count:{
        type:Number,
    }
})


userSchema.pre("save", async function(next){
    if(this.isModified("password")) // isModified is a function already given in mongoose to check if the fireld is chamged or not  
    this.password=await bcrypt.hash(this.password,10);
    next();
 })
 
 
 // custom methods - we can firm as many custom methods as required
 userSchema.methods.isPasswordCorrect= async function(password){
    console.log(password,this.password)
     return await bcrypt.compare(password,this.password)
 }

 export const User= mongoose.model("User",userSchema);