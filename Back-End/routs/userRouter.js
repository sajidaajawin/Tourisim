const express = require("express");
const router = express.Router();
const userController = require("../controlers/userController");

//register/login
router.post("/register", userController.newUser);
router.post("/login", userController.loginUser);

//token decoding
router.post("/decode", userController.decode);

//users/user:id
router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUser);

//delete/update
router.delete("/deleteuser/:id", userController.deleteUser);
router.put("/updateuser/:id", userController.updateUser);





module.exports = router;
