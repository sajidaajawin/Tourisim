const express = require("express");
const userRouts = require("./routs/userRouter");
const blogRouts = require("./routs/blogRouter");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(userRouts);
app.use(blogRouts);
const port = 5000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
