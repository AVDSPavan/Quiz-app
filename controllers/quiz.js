const Quiz = require("../models/quiz");

exports.getquizById = (req, res, next, id) => {
  Quiz.findById(id).exec((err, qui) => {
    if (err) {
      return res.status(400).json({
        error: "quiz not found in DB"
      });
    }
    req.quiz = qui;
    next();
  });
};

exports.createquiz = (req, res) => {

  console.log("Came");
  const quiz = new Quiz(req.body);
  quiz.save((err, quiz) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save quiz in DB"
      });
    }
    res.json({ quiz });
  });
};

exports.getquiz = (req, res) => {
  return res.json(req.quiz);
};

exports.getAllquiz = (req, res) => {
  Quiz.find().exec((err, quizs) => {
    if (err) {
      return res.status(400).json({
        error: "NO quizes found"
      });
    }
    return res.json(quizs);
  });
};

// exports.updatequiz = (req, res) => {
//   const quiz = req.quiz;
//   quiz.name = req.body.name;
//   quiz.option1

//   quiz.save((err, updatedquiz) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Failed to update quiz"
//       });
//     }
//     res.json(updatedquiz);
//   });
// };

exports.removequiz = (req, res) => {
  const quiz = req.quiz;
  quiz.remove((err, quiz) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this quiz"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};
