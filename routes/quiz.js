const express = require("express");
const router = express.Router();

const {
  getquizById,
  createquiz,
  getquiz,
  getAllquiz,
  //updatequiz,
  removequiz
} = require("../controllers/quiz");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("quizId", getquizById);

//actual routers goes here

//create
router.post(
  "/quiz/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createquiz
);

//read
router.get("/quiz/:quizId", getquiz);
router.get("/quizs", getAllquiz);

//update
// router.put(
//   "/quiz/:quizId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updatequiz
// );

//delete

router.delete(
  "/quiz/:quizId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removequiz
);

module.exports = router;