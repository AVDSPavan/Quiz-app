import React, { useState,useEffect} from "react";
import {getQuiz} from "../admin/helper/adminapicall"
import { isAutheticated } from "../auth/helper/index";
import Question from "../core/Question"
const App=({match})=> {
   // const quizId = match.params.quizId;
  const { user, token } = isAutheticated();
  const [ans,setAns] = useState("");
  const [ques,setQues] = useState([]);
  const preload = (quizId) => {
    getQuiz(quizId).then((data) => {
            setQues(data.quest);
    });
};

useEffect(() => {
    preload(match.params.quizId);
}, []);

//   const handleChangeq = () => (event) => {
//   setAns(event.target.value);
//   console.log(event.target.value==answer);}
  return (
    <div className="container bg-green">
              <div className="container">
                  {ques.map((q,key)=>(
                      <Question quesId={q} sno={key}/>
                  ))

                  }
                </div>
            
              </div>
    );
}

export default App;