const Course = require("../models/course");

exports.getcourseById = (req, res, next, id) => {
  Course.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "course not found in DB"
      });
    }
    req.course = cate;
    next();
  });
};

exports.createcourse = (req, res) => {

    console.log("Came");
  const course = new Course(req.body);
  course.save((err, course) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save course in DB"
      });
    }
    res.json({ course });
  });
};

exports.getCourse = (req, res) => {
  return res.json(req.course);
};

exports.getAllcourse = (req, res) => {
  Course.find().exec((err, courses) => {
    if (err) {
      return res.status(400).json({
        error: "NO courses found"
      });
    }
    return res.json(courses);
  });
};

exports.updatecourse = (req, res) => {
  const course = req.course;
  course.name = req.body.name;
  course.count = req.body.count;
  console.log(req.body.count);
  console.log("Updating: "+ course.count)
  course.save((err, updatedcourse) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update course"
      });
    }
    res.json(updatedcourse);
  });
};

exports.removecourse = (req, res) => {
  const course = req.course;
  course.remove((err, course) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this course"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};
