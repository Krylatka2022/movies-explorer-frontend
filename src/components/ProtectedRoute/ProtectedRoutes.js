import React from "react";
import { Navigate } from "react-router-dom";
// import Preloader from "../Movies/Preloader/Preloader";


// export const ProtectedRoutes = ({ component: Component, ...props }) => {
//   return props.isLoading ? <Preloader /> : props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />
// };

// export default ProtectedRoutes;

export const ProtectedRoutes = ({ isLoggedIn, children }) => {

  if (!isLoggedIn) {
    <Navigate to='/' replace />
  }
  return children
}
