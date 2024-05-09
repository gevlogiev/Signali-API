import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";

export default function AuthGuard(props) {
    const { auth } = useContext(AuthContext);
    const currentDate = new Date();
    const expDate = new Date(auth.expDate);
// console.log(currentDate);


// console.log('exp', expDate);
// console.log(expDate >= currentDate);
    if (!auth.accessToken) {
        return <Navigate to="/login" />;
    }

    if (expDate <= currentDate) {

        return <Navigate to="/login" />;
    }

    return <Outlet />;
}