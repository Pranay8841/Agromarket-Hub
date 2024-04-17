import React, { useState } from "react";
import personOnePhoto from "../../assets/Logos/dealer.jpeg";
import personTwoPhoto from "../../assets/Logos/farmer2.jpg";
import personThreePhoto from "../../assets/Logos/shopkeeper.jpg";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Footer from "./Footer";

const Blog = () => {
  const [currentBlog, setCurrentBlog] = useState(0);

  const blogs = [
    {
      name: "Krishna Kumar | Dealer",
      photo: personOnePhoto,
      content:
        "I have found this platform to be the best-selling place to increase the reach of my products to various farmers.",
    },
    {
      name: "Ram Yadav | Farmer",
      photo: personTwoPhoto,
      content:
        "My profits have increased significantly, making me more confident about my growth in farming. I now actively trade different equipment through this platform.",
    },
    {
      name: "Rohan Mehra | Shopkeeper",
      photo: personThreePhoto,
      content:
        "The variety of products available has increased my stock, and offering freshly available farm products makes my consumers happy and satisfied.",
    },
  ];

  const handleNextBlog = () => {
    setCurrentBlog((prevBlog) =>
      prevBlog === blogs.length - 2 ? 0 : prevBlog + 1
    );
  };

  const handlePrevBlog = () => {
    setCurrentBlog((prevBlog) =>
      prevBlog === 0 ? blogs.length - 2 : prevBlog - 1
    );
  };

  return (
    <>
      <div className="container mx-auto py-3">
        <h1 className="text-4xl font-bold mb-7 text-white text-center">Blogs</h1>
        {/* Navigation Arrows */}
        <div className="flex justify-between mb-4">
          <IoIosArrowBack
            onClick={handlePrevBlog}
            className="text-white cursor-pointer hover:text-gray-300 ml-5"
          />
          <IoIosArrowForward
            onClick={handleNextBlog}
            className="text-white cursor-pointer hover:text-gray-300 mr-5"
          />
        </div>
        {/* Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          {/* Display Current Blog 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={blogs[currentBlog].photo}
              alt={blogs[currentBlog].name}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              {blogs[currentBlog].name}
            </h2>
            <p className="text-gray-300">{blogs[currentBlog].content}</p>
            <a
              href="#"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Read More
            </a>
          </div>
          {/* Display Current Blog 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={blogs[currentBlog + 1].photo}
              alt={blogs[currentBlog + 1].name}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              {blogs[currentBlog + 1].name}
            </h2>
            <p className="text-gray-300">{blogs[currentBlog + 1].content}</p>
            <a
              href="#"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
