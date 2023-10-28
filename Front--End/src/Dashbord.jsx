import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashBoard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
  });

  const [statistics, setStatistics] = useState({
    totalUsers: 1000,
    totalOrders: 5000,
    totalRevenue: "$50,000",
  });

  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  const geta = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    console.log(response);
    setBlogs(response.data);
  };
  const getusers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    console.log(response);
    setUsers(response.data);
  };
  useEffect(() => {
    geta();
    getusers();
  }, []);

  const handleDelete = async (blog_id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteblog/${blog_id}`);
      geta();
    } catch (error) {}
  };
  const handleDeleteUser = async (user_id) => {
    try {
      console.log(user_id);
      await axios.delete(`http://localhost:5000/deleteuser/${user_id}`);
      getusers();
    } catch (error) {}
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-welcome">Welcome, {userData.username}!</p>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>Total Blogers</h2>
            <p>{users?.length}</p>
          </div>
          <div className="stat-card">
            <h2>Total Blogs</h2>
            <p>{blogs?.length}</p>
          </div>
          {/* <div className="stat-card">
          <h2>Total Revenue</h2>
          <p>{statistics.totalRevenue}</p>
        </div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <div key={blog.blog_id} className="bg-white rounded-md p-4 shadow-lg">
            <img
              src={`http://localhost:5000/${blog.blog_img}`}
              alt={blog.blog_title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <div className="userid font-semibold text-xl">
              user_id: {blog.user_id}
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {" "}
              Title: {blog.blog_title}
            </h2>
            {/* <p className="text-blue-950 mb-4">{blog.blog_disc}</p> */}
            <button
              className="rounded p-2 shadow-md bg-red-400"
              onClick={() => handleDelete(blog.blog_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2  ">
        {users?.map((user) => (
          <div
            key={user.user_id}
            className="bg-white rounded-md p-4 shadow-lg text-xl "
          >
            <div className="userid font-semibold"> User_id: {user.user_id}</div>
            <h2 className="text-xl font-semibold mb-2">
              Username: {user.username}
            </h2>
            {/* <p className="text-blue-950 mb-4">{blog.blog_disc}</p> */}
            <button
              className="rounded p-2 shadow-md bg-red-400"
              onClick={() => handleDeleteUser(user.user_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
