import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/Signup';


function Route() {

    const appRoute = createBrowserRouter([
        {
            path:"/",
            element: <Login/>
        },
        {
            path:"/signup",
            element: <Signup/>
        }
    ]);

    return <RouterProvider router={appRoute} />;
}

export default Route;