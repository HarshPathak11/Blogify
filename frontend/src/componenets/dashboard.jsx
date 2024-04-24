
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";


import {Link} from 'react-router-dom'
import BlogPage from "./BlogPage";
import Navbar from "./navbar";

function Dashboard() {
    const location = useLocation();
    const data = location.state || {}; // Access the data passed via navigate
    const [blogs,setBlogs]=React.useState([]);

    const navigate=useNavigate();

    const randomPix=[]
    // TO ENABLE RELOAD ELSE DATA VANISHES BUT IT MAKES ADDING THE DATA VERY SLOW
     async function getData(){
        const response= await fetch('http://localhost:3000/api/get',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({
              username: data.name
            })
        })
        if(response.ok)
        { const t=await response.json();
          console.log(t.blogs);
          setBlogs(t.blogs)}
    }
    if(blogs.length===0){
    const a= getData();}
    

    

    const [title,setTitle]=React.useState("");
    const [description,setDescription]=React.useState("");

   async function addPost(event){
        event.preventDefault();
        const response= await fetch('http://localhost:3000/api/add',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({
              username: data.name,
              title: title ,
              description:description
            })
          });
          
        if(response.ok)
        {
            const updatedBlog= await response.json();
            console.log(updatedBlog.blogs)
            setBlogs(updatedBlog.blogs);
            setTitle("");
            setDescription("");
        }  
        else{
            alert("Something Went Wrong !")
        }
   }

   function goToBlog(item){
    return navigate('/blog',{state:{name:data.name,title:item.title,createdAt:item.createdAt,content:item.content}})
   }



    


    return (
        <div className=" min-h-screen bg-slate-800">
         <Navbar logged={true}/>
            <div className="container mx-auto px-4 py-8">
                <div className="md:flex md:space-x-8">
                    <div className="md:w-1/3 mb-8 md:mb-0">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Username: <span className="text-gray-600">{data.name}</span></h2>
                                <h4 className="text-sm text-gray-700">No of posts: <span className="text-gray-600">{blogs.length}</span></h4>
                            </div>
                            <img src="https://cdn.svgator.com/images/2023/03/animated-skating-girls.svg" alt="Animated cartoon pen &amp; pencil friends" ></img>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <div className="grid grid-cols-1 gap-8">
                            {blogs.map(({ title, content, createdAt }) => {
                                return (
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="md:flex">
                                            <div className="md:flex-shrink-0">
                                                <img className="h-48 w-full object-cover md:w-48" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrGVlab993U4yuUERd04-9kPm3e3-eT_qRHBA2cXYsg&s" alt="Blog Image" />
                                            </div>
                                            <div className="p-8">
                                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Blog</div>
                                                <div className="inline-block" onClick={()=>goToBlog({title,content,createdAt})}><a className="block mt-1 text-lg leading-tight font-medium text-gray-800 hover:underline">{title}</a></div>
                                                <p className="mt-2 text-gray-600">{content}</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24" fill="#E97451" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                                        <span className="text-gray-600 mx-6">100 Likes</span>
                                                    </div>
                                                    <div className="text-gray-600">{createdAt.slice(0, 10)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="mt-11 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-[#f7c436]">
                    <div className="bg-[#f7c436] flex justify-center items-center p-5">

                        <form onSubmit={addPost} className="bg-white p-8 rounded-lg shadow-lg w-[100%] md:w-96">
                            <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(event)=>setTitle(event.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={description}
                                    onChange={(event)=>setDescription(event.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none"
                                    placeholder="Enter content"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Add Blog
                            </button>
                        </form>

                    </div>
                    <div className="bg-[url('https://cdn.svgator.com/images/2023/03/message-delivered-to-mailbox-animation.svg')] bg-no-repeat">
                    </div>
                </div>
                            <Footer/>
            </div>
        </div>
    );
}

export default Dashboard;
