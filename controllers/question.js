const Question = require("../models/question");

exports.getquestionById = (req, res, next, id) => {
  Question.findById(id).exec((err, qui) => {
    if (err) {
      return res.status(400).json({
        error: "question not found in DB"
      });
    }
    req.question = qui;
    next();
  });
};

exports.createquestion = (req, res) => {
  // console.log("Question Came");
  // console.log(req.body)
  const question = new Question(req.body);
  question.save((err, question) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ id : question._id});
  });
};

exports.getquestion = (req, res) => {
  return res.json(req.question);
};

exports.getAllquestion = (req, res) => {
  Question.find().exec((err, questions) => {
    if (err) {
      return res.status(400).json({
        error: "NO questiones found"
      });
    }
    return res.json(questions);
  });
};

// exports.updatequestion = (req, res) => {
//   const question = req.question;
//   question.name = req.body.name;
//   question.option1

//   question.save((err, updatedquestion) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Failed to update question"
//       });
//     }
//     res.json(updatedquestion);
//   });
// };

exports.removequestion = (req, res) => {
  const question = req.question;
  question.remove((err, question) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this question"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};



