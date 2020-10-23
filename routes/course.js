const express = require("express");
const router = express.Router();

const {
  getcourseById,
  createcourse,
  getCourse,
  getAllcourse,
  updatecourse,
  removecourse
} = require("../controllers/course");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("courseId", getcourseById);

//actual routers goes here

//create
router.post(
  "/course/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createcourse
);

//read
router.get("/course/:courseId", getCourse);
router.get("/courses", getAllcourse);

//update
router.put(
  "/course/:courseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updatecourse
);

//delete

router.delete(
  "/course/:courseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removecourse
);

module.exports = router;
