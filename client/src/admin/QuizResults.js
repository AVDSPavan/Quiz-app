import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {getQuiz } from "./helper/adminapicall";
const QuizResults = ({ match }) => {
	const [results,setResults] = useState([])
	const [loaded,setLoaded] = useState(false);
    useEffect(() => {
		const preload = async (quizId) => 
		{
			await getQuiz(quizId).then((data) => {
				setResults(data.results);
			}).then(()=>{setLoaded(true)});
		}
		preload(match.params.quizId);
	}, []);
	
	return (
		<Base title="Results">
			<div className="container-fluid">
				<Link className="btn btn-info" to={`/`}>
					<span>Home</span>
				</Link>
				<br />
				<br />
				<br />

				{
					loaded && 
					(
						<div className="container">
					<div className="row">
						<div className="col-12">
						<div className="row text-center mb-2" style={{color:"yellow",textAlign:"center"}}>
										<div className="col-3">
											<h3>Name</h3>
										</div>
                                        <div className="col-4">
											<h3>Email</h3>
										</div>
										<div className="col-2">
										<h3>Percentage</h3>
										</div>
										<div className="col-3">
										<h3>Result</h3>
										</div>
									</div>



						</div>
						</div>
						<div className="row">
						<div className="col-12">
							{results && results.map((result, index) => {
									return (<div className="row text-center mb-2" key={index} style={{color:"white",textAlign:"center"}}>
										<div className="col-3">
											<h4>{result.name}</h4>
										</div>
                                        <div className="col-4">
											<h4>{result.email}</h4>
										</div>
										<div className="col-2">
										<h4>{result.percent}</h4>
										</div>
										<div className="col-3">
										<h4>{result.res}</h4>
										</div>
									</div>)
							})}
						</div>
					</div>
				</div>
			
					)

				}

				</div>
		</Base>
	);
};

export default QuizResults;
