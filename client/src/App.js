import React, { useState} from "react";

const App=({
  question= "What us the curay cadjkvvv habcjd sskjbajscc achbcjab ckcbajc ckjbcaa cacjkbasc asckjjahc sgjgjg fhff gvnfjdihu ssjsjdbd uhvskln ondv dvv kjgasknnccbuiasc cjakbcajhck kahh ?"
  ,option1= "he is the latency thing"
  ,option2= "Choose the correct option"
  ,option3 = "Given your thing as you will do "
  ,option4 = "dsfdgfhjkhl ygweuf cyguwe cgeqee uichqiccnq oicq"
  ,answer = "vcegien uihfu gwiuuqgqw wdqqudoqiq"
  ,marks=5
  ,serialNo=1
})=> {  
  
  const [ans,setAns] = useState("");


  const handleChangeq = () => (event) => {
  setAns(event.target.value);
  console.log(event.target.value==answer);
};
  return (
    <div className="container bg-green">
      <div className="container">
            <div className="container">
              <div className="container">
              <div className="row" >
                <div className="col-12 text-primary" style={{textAlign:"",marginBottom:"10px"}}>
                    {serialNo+". "+ question}
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

export default App;