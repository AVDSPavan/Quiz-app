# Quiz-app

It is a Quiz-app web application developed using React js, Node js, MongoDb and Express. It is fully functional with different views for teacher and student and also implemented with private routes for each role. It is deployed to heroku and you can check it out using the link given below.

## Note :

https://quiz-app9.herokuapp.com/


## Features:
1. HomePage
2. User Dashboard
3. Admin Dashboard
4. SignIn
5. SignUp
6. SignOut
7. Create/Delete Courses
8. Create/Delete Quizs

For each course, able to create one quiz only,

Private routes used for different roles. Authentication used JWT - 'Json Web Token' and stored the token in cache to easily login without entering login details everytime. 

Password is encrypted using crypto and salt using a private key and stored the encrypted password in MongoDb Atlas.

Not able to implement fully functinal quiz application due to time constraints.
