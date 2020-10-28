import React, { useState, useEffect } from "react";
import { getQuiz, getQues, addResult } from "../admin/helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const App = ({ match }) => {
	const { user, token } = isAutheticated();
	const [score, setScore] = useState(0);
	const [totalScore, setTotalScore] = useState(0);
	// const [headers, setHeaders] = useState({
	// 	name: "",
	// 	course: "",
	// 	description: "",
	// });
	const [ques, setQues] = useState([]);
	const [quest, setQuest] = useState({
		question: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		answer: "",
		marks: "",
		currentIndex: 0,
	});
	const [ans, setAns] = useState("");
	const {
		question,
		option1,
		option2,
		option3,
		option4,
		answer,
		marks,
		currentIndex,
	} = quest;
	//const { name, course, description } = headers;
	const [submit, setSubmit] = useState(false);
	const nextQUestionHandler = (questionsArray) => {
		const userAnswer = ans,
			correctAnswer = answer;
		setTotalScore(totalScore + Number(marks));
		if (userAnswer === correctAnswer) {
			setScore(score + Number(marks));
		}
		setAns("");
		if (currentIndex < ques.length) {
			loadQuest(questionsArray[currentIndex], currentIndex);
		}
	};

	const saveResult = async (
		qid,
		uid,
		email,
		token,
		score,
		totalScore,
		studname
	) => {
		await addResult(qid, uid, token, {
			email: email,
			name: studname,
			quiz: qid,
			percent: Math.floor((score / totalScore) * 100),
			res: Math.floor((score / totalScore) * 100) >= 50 ? "Pass" : "Fail",
		})
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				}
			})
			.catch((err) => console.log(err));
	};

	const submitQuiz = (ques) => {
		nextQUestionHandler(ques);
		setSubmit(true);
	};

	const submitted = () => {
		return (
			<div className="container" style={{ color: "white" }}>
				<div className="row justify-content-center">
					<div className="col-6 h2">
						{`You scored ${score} out of ${totalScore}`}
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-6 h2">
						{"Percentage: " + Math.floor((score / totalScore) * 100) + "%"}
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-6 h2">
						{"Result: " +
							(Math.floor((score / totalScore) * 100) >= 50 ? "Pass" : "Fail")}
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-12 h4" style={{ textAlign: "center" }}>
						<Link to="/">
							<button className="btn-success rounded">Go to Home</button>
						</Link>
					</div>
				</div>
			</div>
		);
	};

	const loadQuest = async (id, index) => {
		await getQues(id).then((data) =>
			setQuest({
				...quest,
				question: data.question,
				option1: data.option1,
				option2: data.option2,
				option3: data.option3,
				option4: data.option4,
				answer: data.answer,
				marks: data.marks,
				currentIndex: index + 1,
			})
		);
	};

	useEffect(() => {
		const preload = async (quizId) => {
			await getQuiz(quizId)
				.then((data) => {
					setQues(data.quest);
					return data.quest;
				})
				.then((data) => {
					loadQuest(data[0], 0);
				});
		};
		preload(match.params.quizId);
	}, []);

	const handleChangeq = () => (event) => {
		setAns(event.target.value);
	};

	return (
		<div className="container rounded mt10" style={{ color: "white" }}>
			{ques.length !== 0 && !submit && (
				<div className="container-fluid">
					<div className="container">
						<br />
						<div className="row">
							<div
								className="col-9 h2"
								style={{ textAlign: "", marginBottom: "10px" }}>
								{currentIndex + ".  " + question}
							</div>
							<div className="col-3 h4">{"marks: " + marks}</div>
						</div>
						<div className="row">
							<div className="col-12">
								<input
									type="radio"
									name="ans"
									value={option1}
									onChange={handleChangeq("ans")}
									checked={ans && ans === option1}
								/>
								<label style={{ marginLeft: "10px" }}>{option1}</label>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<input
									type="radio"
									name="ans"
									value={option2}
									onChange={handleChangeq("ans")}
									checked={ans && ans === option2}
								/>
								<label style={{ marginLeft: "10px" }}>{option2}</label>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<input
									type="radio"
									name="ans"
									value={option3}
									onChange={handleChangeq("ans")}
									checked={ans && ans === option3}
								/>
								<label style={{ marginLeft: "10px" }}>{option3}</label>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<input
									type="radio"
									name="ans"
									value={option4}
									onChange={handleChangeq("ans")}
									checked={ans && ans === option4}
								/>
								<label style={{ marginLeft: "10px" }}>{option4}</label>
							</div>
						</div>
					</div>
					<div className="row jsutify-content-center">
						<div className="col-5"></div>
						<div className="col-5">
							<button
								className="btn-success rounded"
								style={{
									display: currentIndex <= ques.length - 1 ? "" : "none",
								}}
								onClick={() => nextQUestionHandler(ques)}>
								Next Question
							</button>

							<button
								className="btn-success"
								style={{
									display: currentIndex > ques.length - 1 ? "" : "none",
								}}
								onClick={() => submitQuiz(ques)}>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}
			<br />
			<div>
				{submit &&
					saveResult(
						match.params.quizId,
						user._id,
						user.email,
						token,
						score,
						totalScore,
						user.name
					) &&
					false}
			</div>
			{ques.length !== 0 && submit && submitted()}
		</div>
	);
};

export default App;
