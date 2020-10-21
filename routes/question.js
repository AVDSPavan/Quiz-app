const express = require("express");
const router = express.Router();

const {
  getquestionById,
  createquestion,
  getquestion,
  getAllquestion,
  //updatequestion,
  removequestion
} = require("../controllers/question");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("questionId", getquestionById);

//actual routers goes here

//create
router.post(
  "/question/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createquestion
);

//read
router.get("/question/:questionId", getquestion);
router.get("/questions", getAllquestion);

//update
// router.put(
//   "/question/:questionId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updatequestion
// );

//delete

router.delete(
  "/question/:questionId/",
  // isSignedIn,
  // isAuthenticated,
  // isAdmin,
  removequestion
);

module.exports = router;