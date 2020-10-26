import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import { Link } from "react-router-dom";
import { getCourse} from "../admin/helper/adminapicall";
import { getQuizs } from "./helper/coreapicalls";
import { isAutheticated } from "../auth/helper";
import { API } from "../backend";

export default function Home() {
	const {user,token} = isAutheticated();
	const [quizs, setQuizs] = useState([]);
	const [attempted,setAttempted] = useState([]);
	const [error, setError] = useState(false);
	
	const getAttemptedlist =async(id,token) =>{
		return await fetch(`${API}/user/${id}`,{
			method:"GET",
			headers:{
				Accept: "application/json",
     			"Content-Type": "application/json",
     			Authorization: `Bearer ${token}`
			}
		}).then(data =>{
			return data.json();
		})
	}


	const loadAllQuizs = async (user,token) => {
		await getAttemptedlist(user._id,token).then(async(res)=>{
			setAttempted(res.attempted);
			await getQuizs().then((data) => {
				if (data.error) {
					setError(data.error);
					console.log(data.error);
				} else {
					setQuizs(data);
				}
			})
		})
		
	};

	useEffect(() => {
		loadAllQuizs(user,token);
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
								{quizs && quizs.map((quiz, index) => {
									return (
										<tr key={index}>
											<td>{quiz.name}</td>
											<td>{quiz.course}</td>
											<td>
												{!isAutheticated().user && (<Link to={`/quiz/attempt/${quiz._id}`}>
													<span className="btn btn-info">Attempt</span>
												</Link>)}
												{/* {attempted && console.log("attempted: "+attempted.includes(quiz._id))} */}
												{isAutheticated().user && isAutheticated().user.role === 0 && (attempted && !attempted.includes(quiz._id))  && (
													<Link to={`/quiz/attempt/${quiz._id}`}>
														<span className="btn btn-info">Attempt</span>
													</Link>
												)}
												{isAutheticated().user && (isAutheticated().user.role === 1 || (attempted && attempted.includes(quiz._id))) && (
													<Link to={`/quiz/results/${quiz._id}`}>
														<span className="btn btn-info">Results</span>
													</Link>
												)}
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
