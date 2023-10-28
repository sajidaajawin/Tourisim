const blog = require("../models/blog");
const jwt = require("jsonwebtoken");

const newblog = async (req, res) => {
  try {
    const { blog_title, blog_disc, user_id } = req.body;
    const file = req.file.path;
    //   const existUser = await blog.getEmail(email);

    //   if (existUser.rows.length > 0) {
    //     return res
    //       .status(400)
    //       .json({ message: "User with the same email already exists" });
    //   }
    const blog_img = file;
    console.log(file, blog_title);
    const newblog = await blog.newblog(
      blog_title,
      blog_img,
      blog_disc,
      user_id
    );

    return res.status(200).json(newblog.rows);
  } catch (error) {
    console.log(error);
  }
};
const getBlogs = async (req, res) => {
  try {
    const result = await blog.getAllblogs();
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getblog = async (req, res) => {
  const blog_id = req.params.id;
  try {
    const result = await blog.getBlog(blog_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getBlogid = async (req, res) => {
  const user_id = req.params.userid;
  try {
    const result = await blog.getBlogid(user_id);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const deleteblog = async (req, res) => {
  const blog_id = req.params.id;
  try {
    const result = await blog.deleteblog(blog_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateblog = async (req, res) => {
  const blog_id = req.params.id;
  const { blog_title, blog_img, blog_disc } = req.body;
  try {
    const result = await blog.updateblog(
      blog_id,
      blog_title,
      blog_img,
      blog_disc
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  newblog,
  getBlogs,
  getblog,
  deleteblog,
  updateblog,
  getBlogid,
};
