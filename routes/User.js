const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test app");
});

router.post("/add", createUser);
router.get("/all", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

module.exports = router;
