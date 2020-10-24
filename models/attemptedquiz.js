const mongoose = require("mongoose");

const attemptedQuiz = new mongoose.Schema({
	student: {
		type: String,
		required:true
	},
	quiz: {
		type: String,
		required:true
	},
	course:{
		type:String,
		required:true
	},
	score: {
		type: Number,
		default: 0,
	},
	totalscore:{
		type: Number,
		default:0
	}
});

module.exports = mongoose.model("AttemptedQuizes", attemptedQuiz);