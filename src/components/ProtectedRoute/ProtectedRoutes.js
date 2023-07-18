// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...props }) => {
//   return props.isLoggedIn ? <Component {...props} /> : <Navigate to="/main" replace />;
// };

// export default ProtectedRoute;

import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({ isLoggedIn, children }) => {

  if (!isLoggedIn) {
    <Navigate to='/' />
  }
  return children
}
