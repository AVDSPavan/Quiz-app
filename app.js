require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const quizRoutes = require("./routes/quiz");
const questionRoutes = require("./routes/question");
const connectDB = require("./database");
//DB Connection
connectDB()

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", quizRoutes);
app.use("/api", questionRoutes);

//PORT
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//Starting a server
app.listen(port, () => {
	console.log(`app is running at ${port}`);
});
