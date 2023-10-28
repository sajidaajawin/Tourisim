const express = require("express");
const router = express.Router();
const blogController = require("../controlers/blogcontroller");
const { upload } = require("../middlewares/multerMiddleware"); // Import the upload middleware

//blog/blogs
router.post("/blog", upload.single("file"), blogController.newblog);
router.get("/blogs", blogController.getBlogs);

//blog:id
router.get("/blog/:id", blogController.getblog);

//blog user
router.get("/blogUser/:userid", blogController.getBlogid);

//delete / update
router.delete("/deleteblog/:id", blogController.deleteblog);
router.put("/updateblog/:id", blogController.updateblog);

module.exports = router;
