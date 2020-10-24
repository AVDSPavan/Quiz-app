import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getQuizs } from "../core/helper/coreapicalls";
import { API } from "../backend";
const ManageQuizs = () => {
	const [quizs, setQuizs] = useState([]);
	const [reload, setReload] = useState(false);
    const { user, token } = isAutheticated();

    const deleteQuiz = (quizId,userId) => {
		return fetch(`${API}/quiz/${quizId}/${userId}`, {
            method: "DELETE",
            headers:{
				Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
		})
			.then((res) => {
				setReload(!reload);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	const preload = () => {
		getQuizs().then((data) => {
			if (data.error) {
				console.log("Error:", data.error);
			} else {
				setQuizs(data);
			}
		});
	};

	useEffect(() => {
		preload();
	}, [reload]);

	return (
		<Base title="Welcome admin" description="Manage quizs here">
			<div className="container-fluid">
				<Link className="btn btn-info" to={`/admin/dashboard`}>
					<span>Admin Home</span>
				</Link>
				<br />
				<br />
				<br />
				<div className="container">
                    <div className="row text-center mb-2">
                        <div className="col-4"><h3 className="text-left" style={{color:"yellow"}}>Quiz Name</h3></div>
                        <div className="col-4"><h3 className="text-left" style={{color:"yellow"}}>Course</h3></div>
                        <div className="col-4"><h3 style={{color:"yellow"}}>Options</h3></div>
                    </div>
					<div className="row">
						<div className="col-12">
							{quizs.map((quiz, index) => {
								return (
									<div className="row text-center mb-2 " key={index}>
										<div className="col-4">
											<h3 className="text-white text-left">{quiz.name}</h3>
										</div>
                                        <div className="col-4">
											<h3 className="text-white text-left">{quiz.course}</h3>
										</div>
										<div className="col-4">
											<button
												onClick={() => {
													deleteQuiz(quiz._id,user._id,token);
												}}
												className="btn btn-danger">
												Delete
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default ManageQuizs;
