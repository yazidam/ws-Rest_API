const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/UserController");
const { userValidator, validate } = require("../middlewares/validators");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test app");
});

router.post("/add", userValidator, validate, createUser);
router.get("/all", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
