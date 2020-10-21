const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const attemptedQuiz = new mongoose.Schema({
	student: {
		type: ObjectId,
		ref: "User",
	},
	quiz: {
		type: ObjectId,
		ref: "Quiz",
	},
	correct: {
		type: Number,
		default: 0,
	},
	wrong: {
		type: Number,
		default: 0,
	},
	score: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("AttemptedQuizes", attemptedQuiz);