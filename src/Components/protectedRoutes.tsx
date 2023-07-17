 import { Navigate } from "react-router-dom";
// import { getToken } from "../hooks/auth";

export const PrivateRoute = ({ children , redirectTo= '/'}) => {
    const token = localStorage.getItem('token');
    if (!token) {
     return <Navigate to={redirectTo} />;
    } 
    return children;  

}
// 

// if (localStorage.getItem('token') === null) {
//     return <Navigate to= "/" />;
// } if (localStorage.getItem('token')) {
//   return <Navigate to="/order" />;
//   // window.location.href = '/order';
// }