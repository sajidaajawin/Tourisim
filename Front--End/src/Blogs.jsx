import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  const geta = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    console.log(response);
    setBlogs(response.data);
  };
  useEffect(() => {
    geta();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {currentBlogs.map((blog) => (
        <div key={blog.blog_id} className="bg-white rounded-md p-4 shadow-lg">
          <img
            src={`http://localhost:5000/${blog.blog_img}`}
            alt={blog.blog_title}
            className="w-full h-32 object-cover mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">{blog.blog_title}</h2>
          {/* <p className="text-blue-950 mb-4">{blog.blog_disc}</p> */}
          <Link
            to={`/blogs/${blog.blog_id}`}
            className="text-blue-950 hover:underline"
          >
            More Details
          </Link>
        </div>
      ))}
      <div className="col-span-full flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(blogs.length / blogsPerPage) },
          (_, index) => index + 1
        ).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 p-2 bg-blue-950 text-white hover:bg-blue-800 focus:outline-none ${
              currentPage === number ? "bg-blue-950" : ""
            }`}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
