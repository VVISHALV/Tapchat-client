import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  return sessionStorage.getItem("user");
};

const ProtectedRoutes = (props) => {
  const isAuth = useAuth();
  console.log("in protected route" ,props.loggedin,isAuth)
  if(props.loggedin)
  return isAuth ? <Outlet /> : <Navigate to="/" />;
  return isAuth ? <Navigate to="/home" /> :<Outlet /> ;
};

export default ProtectedRoutes;