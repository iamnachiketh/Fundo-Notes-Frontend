import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/Signup';
import Home from '../pages/Home/Home';


function Route() {

    const appRoute = createBrowserRouter([
        {
            path:"/",
            element: <Login />
        },
        {
            path:"/signup",
            element: <Signup />
        },
        {
            path: "/home",
            element: <Home />
        }
    ]);

    return <RouterProvider router={appRoute} />;
}

export default Route;