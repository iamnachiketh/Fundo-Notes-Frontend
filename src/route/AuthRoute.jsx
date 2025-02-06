import { Navigate } from "react-router-dom";

export const AuthRoute = function ({ children }) {
    const token = localStorage.getItem("token");

    if(token == null || token == undefined){
        return children;
    }

    return <Navigate to = "/home/notes" />
}