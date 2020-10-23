const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const questionSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		option1: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		option2: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		option3: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		option4: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		answer: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		marks:{
			type:String,
			default:1
		}
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Question", questionSchema);
