import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setBlog(response.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  console.log(blog);
  return (
    <div className="max-w-md mx-auto bg-navy-950 text-navy-900 rounded-lg overflow-hidden shadow-lg mt-72">
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4">{blog.blog_title}</h2>
        <p className="text-lg">{blog.blog_disc}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
