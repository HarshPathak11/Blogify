import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../componenets/contact.jpg'
import Footer from "./footer";
import Navbar from "./navbar";

function Home(){
    const [random,setRandom]=React.useState([]);
    const navigate=useNavigate();
    async function getRandomBlogs(){
        
        const response=await fetch('http://localhost:3000/api/random',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            }
        });

        if(response.ok){
            const data=await response.json();
            console.log(data);
            setRandom(data.randomBlogs);
        }
        else{
            setRandom(dummydata);
        }
    }

    if(random.length==0){
        getRandomBlogs();
    }

    function goToBlog(item){
        return navigate('/blog',{state:{name:item.user.username,createdAt:item.createdAt,title:item.title,content:item.content}})
       }

    return(
        <div className="bg-slate-800 h-full">
        <Navbar logged={false}></Navbar>
        <div className="grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 ">
            <div className="flex justify-center items-center">
              <div className="pl-1 text-white flex justify-center items-center flex-col">
                <h1 className="text-yellow text-3xl sm:text-4xl md:text-6xl text-center m-4 ">SHOW US THE POWER OF YOUR WORDS
                </h1>
                <p className="text-center">Over 20 million + posts and still counting.</p>
                <Link to="/register" ><button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Get Started</button></Link>
                </div>
            </div>
            <div className="flex justify-center">
            <img data-v-83bd8314="" src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg" width="500" />
            </div>
        </div>
        <div className=" text-3xl md:text-5xl text-center font-bold text-white flex justify-center items-center">
           <span className="p-11"> TOP PICKS FOR YOU.. </span>
        </div>
        <div className="grid grid-rows-6 md:grid-rows-2 md:grid-cols-3">
        {/* <img src="https://cdn.svgator.com/images/2023/03/wind-blowing-in-may-svg-animation.svg" alt="Animated winf blowing the grassd with a bee passing by" class="lightense-target h-96"/> */}
    
        {random.map(({title,content,user,createdAt})=>{
            return(
                <div onClick={()=>{goToBlog({title,content,user,createdAt})}} className="mt-11 max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300  cursor-pointer">
         <img className="w-full h-48 object-cover object-center" src="https://source.unsplash.com/random" alt="Card image" />
         <div className="p-4 h-48 w-72">
         <h2  className="text-xl font-semibold mb-2">{title}</h2>
         <p className="text-gray-700">{content.slice(0,100)+"..."}</p>
         <p className="text-gray-800 font-bold">By {user.username}</p>
        </div>
        </div>
            )
        })}
        </div>
        <div className=" bg-white mt-20 flex flex-col sm:flex-row">
        <img src="https://cdn.svgator.com/images/2023/03/wind-blowing-in-may-svg-animation.svg" alt="Animated winf blowing the grassd with a bee passing by" class="lightense-target sm:w-1/2"/>
        <img src={img} className="w-full sm:w-1/2 sm:h-[30vw]"/>
        </div>
        <div>
           <Footer/> 
        </div>












        </div>
    )
}

export default Home;