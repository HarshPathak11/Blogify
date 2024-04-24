import mongoose, { connect } from "mongoose";

const Mongo_URI="mongodb+srv://HarshP:Harshp1110@cluster0.sjhvrlj.mongodb.net/Blogs"

// console.log(process.env.MONGO)

const connecttoDb=async()=>{
    try{
        const connection= await mongoose.connect(`${process.env.MONGO}`);
        // console.log(connection);
        console.log("Mongo DB Connected");
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export default connecttoDb;