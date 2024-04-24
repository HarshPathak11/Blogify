import React from 'react';
import Footer from './footer';
import { useLocation } from 'react-router-dom';
const BlogPage = () => {
    const location = useLocation();
    const data = location.state || {}; // Access the data passed via navigate
    console.log(data)
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Upper row with image */}
      <div className="relative bg-blue-500 h-96 overflow-hidden">
        <img src="https://source.unsplash.com/random" alt="Blog post" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">Welcome to Our Blog</h1>
        </div>
      </div>

      {/* Lower row with title, author, date, and content */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title, author, and date */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">{data.title}</h1>
            <div className="flex items-center text-gray-600">
              <p className="mr-4">By {data.name}</p>
              <p>Published on {data.createdAt}</p>
            </div>
          </div>

          {/* Blog content */}
          <div className="prose lg:prose-xl text-gray-800">
            <p>{data.content}</p>
            {/* Add more content here */}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;
