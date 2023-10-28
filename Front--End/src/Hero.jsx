import React from "react";

const Hero = ({ onAddBlogClick }) => {
  return (
    <div className="bg-indigo-50 text-blue-950 py-16 text-center relative">
      <img
        src="https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQ4dodIImH6Q2y4dvmuwXlvcEWGRPewQ_DmhacEVjcIiOME5SHMinNgh6U60zOH1mM5"
        alt="Travelers Blog"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4 transition-all duration-3 ease-in-out">
          Welcome to Travelers Blog
        </h1>
        <p className="text-blue-950-lg mb-8">
          Discover amazing content and share your thoughts with the world.
        </p>
      </div>
    </div>
  );
};

export default Hero;
