const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const quizSchema = new mongoose.Schema(
	{
		quest:[{type:ObjectId,ref:"Question"}],
		createdby: {
			type: ObjectId,
			ref: "User",
			required:true
		},
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 2000,
		},
		results: {
			type: Array,
			default:[] 
		},
		course: {
			type: String,
			required: true
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);