import express from "express";
import dotenv from 'dotenv'
import connecttoDb from "./db/db.js";
import router from "./routes/user.routes.js";
import cors from 'cors'

const app= express();

app.use(cors())
// app.use(cors({
//     origin:"*",
//     credentials:true
// }))

//for json data
app.use(express.json({
    limit:"20kb"
}))

//for url data
app.use(express.urlencoded({extended:true}))

dotenv.config(
    {
        path:'.\env'
    }
)

connecttoDb()

app.use('/api',router)
console.log(process.env.PORT)

app.listen(process.env.PORT||3000,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})