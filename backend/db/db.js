import mongoose, { connect } from "mongoose";



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