import { API } from "../../backend";

//category calls
export const createCourse = (userId, token, category) => {
  return fetch(`${API}/course/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//get all categories
export const getCourses = async () => {
  return await fetch(`${API}/courses`, {
    method: "GET"
  })
  .then(res =>{return res.json()})
  .catch(err => console.log(err));
};

export const getCourse = courseId => {
  return fetch(`${API}/course/${courseId}`, {
    method: "GET",
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const updateCourse = (courseId, userId, token, course) => {
  return fetch(`${API}/course/${courseId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(course)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const createQuestion = (userId,token,body) =>{
  return fetch(`${API}/question/create/${userId}`,{
    method:"POST",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`  
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}


export const createaQuiz = (userId,token,body) =>{
  console.log(body);
  return fetch(`${API}/quiz/create/${userId}`,{
    method:"POST",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`  
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}


export const getQuiz = (quizId) => {
  return fetch(`${API}/quiz/${quizId}`, {
    method: "GET",
    headers:{
      Accept: "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};


export const getQues = quesId => {
  return fetch(`${API}/question/${quesId}`, {
    method: "GET",
    headers:{
      Accept: "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};