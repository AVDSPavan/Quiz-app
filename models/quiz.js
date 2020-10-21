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
			type: [{type:ObjectId,ref:"User"}]
		},
		// result: {
		// 	type: Number,
		// 	default: 0,
		// },
		course: {
			type: ObjectId,
			ref: "Category",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);