import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCourse from "./admin/AddCourse";
import ManageCourses from "./admin/ManageCourses";
import AddQuiz from "./admin/AddQuiz";
import ManageQuizs from "./admin/ManageQuiz";
import AttemptQuiz from "./user/AttemptQuiz";
// import UpdateQuiz from "./admin/UpdateQuiz";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				{/* <Route path="/cart" exact component={Cart} /> */}
				<PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
				<AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
				<AdminRoute path="/admin/create/course" exact component={AddCourse} />
				<AdminRoute
          path="/admin/course"
          exact
          component={ManageCourses}
        />
        <AdminRoute path="/admin/create/quiz" exact component={AddQuiz} />

        <AdminRoute path="/admin/quizs" exact component={ManageQuizs} />
        {/* <AdminRoute
          path="/admin/course/update/:courseId"
          exact
          component={UpdateCourse}
        /> */}
        {/* <AdminRoute
          path="/admin/quiz/update/:quizId"
          exact
          component={UpdateQuiz}
        /> */}
				{/* <Route path="/course/:courseId" exact component={} /> */}
        <PrivateRoute path="/quiz/attempt/:quizId" exact component={AttemptQuiz} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
