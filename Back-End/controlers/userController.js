const User = require("../models/users");
const jwt = require("jsonwebtoken");
const key = "issa";
const newUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(password);
    const existUser = await User.getEmail(email);

    if (existUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }
    const newUser = await User.newUser(username, email, password);

    return res.status(200).json(newUser.rows);
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async (req, res) => {
  try {
    console.log("issa")
    const result = await User.getAllData();
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.getUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const decode = (req, res) => {
  const { token } = req.body;
  try {
    const result = User.decodeToken(token, key);
    // console.log("object");
    // console.log(result);
    // console.log("object");
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.deleteUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const updateUser = async (req, res) => {
  const user_id = req.params.id;
  const { username, email, password } = req.body;
  try {
    const result = await User.updateUser(user_id, username, email, password);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const loginUser = async (req, res) => {
    // const user_id = req.params.id;
  const { email, password } = req.body;
  try {
    const result = await User.getEmail(email);
    console.log(result.rows);
    if (result.rows.length > 0) {
      //user found
      const user = result.rows[0];
      if (password == user.password) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username },
          key
        );

        return res.json({ user, token });
      } else {
        return res.json({ message: "incorrect pas" });
      }
    } else {
      return res.json({ message: "not found" });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  newUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  decode,
};
