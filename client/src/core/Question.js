import React, { useState,useEffect} from "react";
import {getQues} from "../admin/helper/adminapicall"
const Question=({quesId,sno})=> {  
  const [quest,setQuest] = useState({
      question:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      answer:"",
      marks:"",
  })
  const [ans,setAns] = useState("");
  const preload = () => {
    getQues(quesId).then((data) => {
            setQuest({...quesId,
                question:data.question,
                option1:data.option1,
                option2:data.option2,
                option3:data.option3,
                option4:data.option4,
                answer:data.answer,
                marks:data.marks
            });
    });
};
const {question,option1,option2,option3,option4,answer,marks} = quest;
useEffect(() => {
    preload();
}, []);

  const handleChangeq = () => (event) => {
  setAns(event.target.value);
  console.log(event.target.value==answer);
};
  return (
    <div className="container bg-green">
      <div className="container">
            <div className="container">
              <div className="container">\<br/>
              <div className="row" >
                <div className="col-12 text-primary" style={{textAlign:"",marginBottom:"10px"}}>
                    {sno+1 +".  "+question}
                </div>
              </div>
                <div className="row" style={{color:"white"}}>
                <div className="col-12">
					<input type="radio" name="ans" value={option1} onChange={handleChangeq("ans")}/>
    <label style={{marginLeft:"10px"}} >{option1}</label>
				</div>
        </div>
        <div className="row" style={{color:"white"}}>
				<div className="col-12">
					<input type="radio" name="ans" value={option2} onChange={handleChangeq("ans")}/>
    <label style={{marginLeft:"10px"}}>{option2}</label>
				</div>
                
                </div>
                <div className="row" style={{color:"white"}}>
                <div className="col-12">
					<input type="radio" name="ans" value={option3} onChange={handleChangeq("ans")}/>
    <label style={{marginLeft:"10px"}}>{option3}</label>
				</div>
        </div>
        <div className="row" style={{color:"white"}}>
				<div className="col-12">
					<input type="radio" name="ans" value={option4} onChange={handleChangeq("ans")}/>
    <label style={{marginLeft:"10px"}}>{option4}</label>
				</div>
                
                </div>
                </div>
            
              </div>
              </div>
  
    </div>
    );
}

export default Question;