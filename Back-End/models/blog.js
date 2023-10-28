const db = require("../lib/db");

function getAllblogs() {
  return db.query("SELECT * FROM blog");
}
function getBlog(blog_id) {
  const queryText = "SELECT * FROM blog WHERE blog_id = $1";
  const value = [blog_id];
  return db.query(queryText, value);
}
function getBlogid(user_id) {
  const queryText = "SELECT * FROM blog WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}
// function getEmail(email) {
//   const queryText = "SELECT * FROM blog WHERE email = $1";
//   const value = [email];
//   return db.query(queryText, value);
// }
function newblog(blog_title, blog_img, blog_disc ,user_id) {
  const queryText =
    "INSERT INTO blog (blog_title, blog_img, blog_disc, user_id) VALUES ($1,$2,$3,$4)";
  const values = [blog_title, blog_img, blog_disc,user_id];
  return db.query(queryText, values);
}
function deleteblog(blog_id) {
  const queryText = "DELETE FROM blog WHERE blog_id = $1";
  const value = [blog_id];
  return db.query(queryText, value);
}
function updateblog(blog_id, blog_title, blog_img, blog_disc) {
  const queryText =
    "UPDATE blog  SET blog_title = $2, blog_img = $3, blog_disc = $4  WHERE blog_id = $1";
  const value = [blog_id, blog_title, blog_img, blog_disc];
  return db.query(queryText, value);
}

module.exports = {
  getAllblogs,
  newblog,
  getBlog,
  deleteblog,
  updateblog,
  getBlogid
  // getEmail,
  //   loginUser
};
