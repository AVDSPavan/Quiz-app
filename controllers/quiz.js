const Quiz = require("../models/quiz");
const Question = require("../models/question");

exports.getquizById = (req, res, next, id) => {
	Quiz.findById(id).exec((err, qui) => {
		if (err) {
			return res.status(400).json({
				error: "quiz not found in DB",
			});
		}
		req.quiz = qui;
		next();
	});
};

exports.createquiz = (req, res) => {
	// console.log("Quiz Came");
	// console.log(req.body);
	const quiz = new Quiz(req.body);
	quiz.save((err, quiz) => {
		if (err) {
			return res.status(400).json({
				error: "NOT able to save quiz in DB",
			});
		}
		res.json({ quiz });
	});
};

exports.updatequiz = (req, res) => {
	const quiz = req.quiz;
	const user = req.profile;
	//const { attempetedQuizId } = req.body;
	quiz.results.push(req.body);
	user.attempted.push(quiz._id);

	quiz.save((err, updatedquiz) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to store result in quiz",
			});
		}
		user.save((err, updatedUser) => {
			if (err) {
				return res.status(400).json({
					error: "Failed to store quiz id in user",
				});
			}
		});
		res.json(updatedquiz);
	});
};

exports.getquiz = (req, res) => {
	return res.json(req.quiz);
};

exports.getAllquiz = (req, res) => {
	Quiz.find().exec((err, quizs) => {
		if (err) {
			return res.status(400).json({
				error: "NO quizes found",
			});
		}
		return res.json(quizs);
	});
};

exports.removequiz = (req, res) => {
	const quiz = req.quiz;
	quiz.remove((err, quiz) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete this quiz",
			});
		}
		res.json({
			message: "Successfully deleted",
		});
	});
};
