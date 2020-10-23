import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { Link } from "react-router-dom";
//import Card from "./Card";
import {getCourse} from "../admin/helper/adminapicall";
import { getQuizs } from "./helper/coreapicalls";

export default function Home() {
	const [quizs, setQuizs] = useState([]);
	const [error, setError] = useState(false);

	const loadAllQuizs = () => {
	 	getQuizs().then((data) => {
	 		if (data.error) {
	 			setError(data.error);
	 			console.log(data.error);
	 		} else {
	 			setQuizs(data);
	 		}
	 	});
	 };

	 useEffect(() => {
	 	loadAllQuizs();
	 }, []);

	return (
		<Base title="Home Page">
			<div className="row text-center">
					<div className="col-md">
						<div className="table-responsive">
							<table className="table table-dark">
								<thead style={{ textAlign: "center" }}>
									<tr>
										<td className="h4">Name</td>
										<td className="h4">Course</td>
										<td className="h4">Status</td>
									</tr>
								</thead>
								<tbody style={{ textAlign: "center" }}>
									{quizs.map((quiz, index) => {
										return (
											<tr key={index}>
												<td>{quiz.name}</td>
												<td>{quiz.course}</td>
												<td>
													
													<Link to={`/quiz/attempt/${quiz._id}`}>
														<span className="btn btn-secondary">Attempt</span>
													</Link>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
			


				 {/* <div className="row">
					{quizs.map((quiz, index) => {
						return (
							<div key={index} className="col-sm-4 mb-4">
						<h3>{quiz.name+" "+quiz.course}</h3>
							</div>
						);
					})}
				</div> */}
			</div>
		</Base>
	);
}
