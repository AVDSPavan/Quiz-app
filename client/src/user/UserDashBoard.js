import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const { user: { name, email ,role}} = isAutheticated();

//   const UserLeftSide = () => {
//     return (
//       <div className="card">
//         <h4 className="card-header bg-dark text-white">user Navigation</h4>
//         <ul className="list-group">
//           <li className="list-group-item">
//             <Link to="/user/create/category" className="nav-link text-success">
//               Create Categories
//             </Link>
//           </li>
//           <li className="list-group-item">
//             <Link to="/user/categories" className="nav-link text-success">
//               Manage Categories
//             </Link>
//           </li>
//           <li className="list-group-item">
//             <Link to="/user/create/product" className="nav-link text-success">
//               Create Product
//             </Link>
//           </li>
//           <li className="list-group-item">
//             <Link to="/user/products" className="nav-link text-success">
//               Manage Products
//             </Link>
//           </li>
//           {/* <li className="list-group-item">
//             <Link to="/user/orders" className="nav-link text-success">
//               Manage Orders
//             </Link>
//           </li> */}
//         </ul>
//       </div>
//     );
//   };

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">user Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">user Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to user area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        {/* <div className="col-md-3">{userLeftSide()}</div> */}
        <div className="col-md-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
