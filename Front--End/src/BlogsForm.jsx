import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogsForm = ({ onAddBlog }) => {
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState("");
  const [disc, setdisc] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    setImage(selectedFile);
  };
  const geta = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    console.log(response);
    setBlogs(response.data);
  };
  useEffect(() => {
    //  const token=  localstorage.token
    //  post //decode
    //userid

    geta();
  }, []);
  console.log(blogs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.user_id !== undefined) {
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      console.log(user_id);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("blog_title", blog);
      formData.append("user_id", user_id);
      formData.append("blog_disc", disc);
      console.log(formData);

      try {
        console.log("object");
        const response = await axios.post(
          "http://localhost:5000/blog",
          formData
        );
        console.log(response);
        geta();
      } catch (error) {
        console.error(error);
      }
    } else {
      //handle user login
    }
    // You can process the selected file here.
  };

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Blog Title
          </label>
          <input
            id="title"
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
            name="blog_title"
            onChange={(e) => setBlog(e.target.value)}
            value={blog}
            required
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-600"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="mt-1 p-2 w-full border rounded-md"
            value={blogData.author}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image URL
          </label>
          <input
            id="image"
            className="mt-1 p-2 w-full border rounded-md"
            type="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            name="disc"
            onChange={(e) => setdisc(e.target.value)}
            value={disc}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-800"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogsForm;
