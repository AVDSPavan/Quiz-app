import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email
    //role
  }
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/course" className="nav-link text-success">
              Create Course
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/course" className="nav-link text-success">
              Manage Courses
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/quiz" className="nav-link text-success">
              Create Quiz
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/quizs" className="nav-link text-success">
              Manage Quizs
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">{adminLeftSide()}</div>
        <div className="col-md-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
