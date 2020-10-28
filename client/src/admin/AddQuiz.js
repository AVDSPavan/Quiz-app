import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
	getCourses,
	updateCourse,
	getCourse,
	createaQuiz,
	createQuestion,
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AddQuiz = () => {
	const { user, token } = isAutheticated();
	const [tempQuestions, setTempQuestions] = useState([]);
	const [ques, setQues] = useState({
		question: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		answer: "",
		marks: "",
	});
	const { question, option1, option2, option3, option4, answer, marks } = ques;
	const [values, setValues] = useState({
		name: "",
		description: "",
		course: "",
		courses: "",
		quest: "",
		createdby: "",
		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
	});

	const {
		name,
		description,
		course,
		courses,
		createdProduct
	} = values;

	const preload = () => {
		getCourses().then((data) => {
			//console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, courses: data });
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const addQuestion = (event) => {
		event.preventDefault();
		createQuestion(user._id, token, ques).then((data) => {
			if (data.error) {
				console.log("Error: " + data.error);
			} else {
				const { id } = data;
				console.log(id);
				setTempQuestions((tempQuestions) => [...tempQuestions, id]);
				setQues({
					...ques,
					question: "",
					option1: "",
					option2: "",
					option3: "",
					option4: "",
					answer: "",
					marks: "",
				});
				window.alert("Question added to the quiz...")
			}
		});
	};
	const onSubmit = (event) => {
		event.preventDefault();
		//	console.log(tempQuestions)
		//	setValues({...values,quest:tempQuestions,createdby:user._id})
		//formData.set(quest, tempQuestions);
		//formData.set(createdby, user._id);
		getCourse(course).then(
			(data) => (
				setValues({ ...values, course: data.name }),
				updateCourse(data._id, user._id, token, {name:data.name,count: data.count + 1 }).then(res => (
					setValues({ ...values, error: "", loading: true }),
					createaQuiz(user._id, token, {
						quest: tempQuestions,
						createdby: user._id,
						name: name,
						description: description,
						course: data.name,
						}).then((data) => {
						if (data.error) {
							setValues({ ...values, error: data.error })
						} else {
							window.alert("Your New Quiz is Created...")
							setValues({...values,
							name: "",
							description: "",
							course: "",
							questions: "",
							createdby: "",
							loading: false,
							createdProduct: data.name,
						})
					}}))	
					)));
	};

	const handleChange = (name) => (event) => {
		const value = event.target.value;
		setValues({ ...values, [name]: value });
	};
	const handleChangeq = (name) => (event) => {
		const value = event.target.value;
		//formData.set(name, value);
		setQues({ ...ques, [name]: value });
	};

	const successMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: createdProduct ? "" : "none" }}>
			<h4>{createdProduct} created successfully</h4>
		</div>
	);

	const createQuizForm = () => (
		<form>
			<br/>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					name="name"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange("description")}
					name="description"
					className="form-control"
					placeholder="Description(Optional)"
					value={description}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange("course")}
					className="form-control"
					placeholder="Course">
					<option>Select Course</option>
					{courses &&
						courses.map((cours, index) => {
							if (cours.count === 0) {
								return (
									<option key={index} value={cours._id}>
										{cours.name}
									</option>
								);
							}
							return ""
						})}
				</select>
			</div>
			<div>
				<input
					onChange={handleChangeq("question")}
					name="question"
					className="form-control"
					placeholder="Question"
					value={question}
				/>
				<input
					onChange={handleChangeq("option1")}
					name="option1"
					className="form-control"
					placeholder="Option 1"
					value={option1}
				/>
				<input
					onChange={handleChangeq("option2")}
					name="option2"
					className="form-control"
					placeholder="Option 2"
					value={option2}
				/>
				<input
					onChange={handleChangeq("option3")}
					name="option3"
					className="form-control"
					placeholder="Option 3"
					value={option3}
				/>
				<input
					onChange={handleChangeq("option4")}
					name="option4"
					className="form-control"
					placeholder="Option 4"
					value={option4}
				/>
				<input
					onChange={handleChangeq("answer")}
					name="answer"
					className="form-control"
					placeholder="Answer"
					value={answer}
				/>
				<input
					onChange={handleChangeq("marks")}
					name="marks"
					className="form-control"
					placeholder="Marks"
					value={marks}
				/>
				<br/>
				<button
					type="submit"
					onClick={addQuestion}
					className="btn btn-outline-primary mb-3">
					Add Question
				</button>
			</div>
			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3">
				Create Quiz
			</button>
		</form>
	);

	return (
		<Base
			title="Add a quiz here!"
			description="Welcome to Quiz creation section"
			className="container bg-info p-4">
			<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
				Admin Home
			</Link>
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{createQuizForm()}
				</div>
			</div>
		</Base>
	);
};

export default AddQuiz;
