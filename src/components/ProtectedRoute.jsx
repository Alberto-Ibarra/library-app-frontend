import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    let user = null;
    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        user = null;
    }

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If roles are specified but the user does not have access, redirect
    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to="/book-copies" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
