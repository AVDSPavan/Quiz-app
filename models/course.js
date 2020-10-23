const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			unique: true,
		},
		count:{
			type:Number,
			default:0
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
