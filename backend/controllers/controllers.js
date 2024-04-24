import { User } from "../models/user.model.js";
import { Blog } from '../models/blog.model.js';
import bcrypt from 'bcrypt'

const handleLogin=async (req,res)=>{
    // console.log(req.body)
    const {email, password} =req.body;
    // if(!username)
    // return res.status(400).json({"message":"Name field cannot be empty"});
    if(!email)
    return res.status(400).json({"message":"Email field cannot be empty"});
    if(!password)
    return res.status(400).json({"message":"Password field cannot be empty"});
    
    const user= await User.findOne({
        $or:[{email}]
    }).populate('blogs')

    if(!user)
    return res.status(500).json({"message":"Something went wrong"});

    const isPasswordOkay= await user.isPasswordCorrect(password);
    console.log(isPasswordOkay,password)
    if(!isPasswordOkay)
    return res.status(400).json({"message":"Password is not correct"});
    else{
    // console.log(user.blogs);
    return res.status(200).json({"message":"Access Granted",
"blogs":user.blogs,"name":user.username,"count":user.count});
}}

const handleRegister= async (req,res)=>{
    
    const {username, email, password,confirmPassword}=req.body;
    // console.log(username,password,email)
    if(!username)
    return res.status(400).json({"message":"Username is required"}); ;
    if(!email)
    return res.status(400).json({"message":"Email is required"});;
    if(!password)
    return res.status(400).json({"message":"Password is required"});;
    if(!confirmPassword)
    return res.status(400).json({"message":"confirmPassword is required"});;

    if(password!==confirmPassword)
    return res.status(400).json({"message":"invalid password"});

    //checking if user already exists
    const user= await User.findOne({
        $or:[{email},{username}]
    })
    if(user)
     return res.status(400).json({"message":"User already exists"})

    // const cryptPassword= bcrypt(password)

    const newUser= await User.create({ username: username,password:password, email: email, blogs:[],count:0 })
   /* .then(user => {
      console.log('User created:', user);
    })
    .catch(err => {
      console.error('Error creating user:', err);
    });*/
     
    const createdUser=await User.findById(newUser._id).select("--password")
    if(!createdUser)
    return res.status(500).json({"message":"Something went wrong while registration"});
    // console.log(createdUser)
    return res.status(200).json({
        "message":"User Registered Successfully",
"blogs":createdUser.blogs,"name":createdUser.username,"count":createdUser.count
    })
}


// //if the user had blogs as an array of objects, and not reference ObjectId
// const addBlogs= async(req,res)=>{
//     const {uid, title, desc}=req.body;
//     if(!uid || !title || !desc)
//     return res.status(400).json({"message":"error"});

//     const updatedUser= await User.findOneAndUpdate(
//         { username:uid }, // Filter
//         { $push: { blogs: { title: title, content: desc } } },   
//         { new: true }             // Return updated user
//       )

//     if(!updatedUser)
//     return res.status(500).json({"message":"could not update"});

//     return res.status(200).json({"message":"updated"}) 
// }

const updateBlog = async (req, res) => {
    try {
      const { username, title, description } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new blog instance
      const newBlog = new Blog({
        title,
        content: description,
        user: user._id // Assign the user's id to the blog
      });
  
      // Save the blog to the database
      await newBlog.save();
  
      // Update the user's blogs array with the new blog id
      user.blogs.push(newBlog._id);
      await user.save();

      const updatedUser=await User.findById(user._id).populate('blogs')

      if(!updatedUser)
      return res.status(500).json({"mmessage":"Something went wrong at line 122"})
  
      return res.status(201).json({ message: 'Blog created successfully' ,blogs:updatedUser.blogs});
    } catch (error) {
      console.error('Error creating blog:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getUser=async (req,res)=>{
    const {username}=req.body;
    if(!username)
    return res.status(400).json({"message":"Did not get username for fetching data"})

    const user= await User.findOne({username}).populate('blogs');
    if(!user)
    return res.status(500).json({"message":"something went wrong"});

    return res.status(200).json({blogs:user.blogs})
  }

  const getRandomBlogs = async (req, res) => {
    try {
     
      const randomBlogs = await Blog.aggregate([
        { $sample: { size: 6 } }, // Randomly select 6 documents
        { 
          $lookup: {
            from: "users", // Assuming the referenced collection is named "users"
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user" // Unwind the "user" array created by the $lookup stage
        },
        {
          $project: {
            "user.username": 1,
            "title":1,
            "content":1,
            "createdAt":1 // Include only the "username" field from the "user" subdocument
            // You can add more fields if needed, or set to 0 to exclude
          }
        }
      ]);
  
      return res.status(200).json({ randomBlogs });
    } catch (error) {
      console.error('Error fetching random blogs:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
export {handleLogin, handleRegister,updateBlog,getUser,getRandomBlogs}