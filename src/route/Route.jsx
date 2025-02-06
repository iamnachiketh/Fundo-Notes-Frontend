import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthRoute } from "./AuthRoute"
import { ProtectedRoute } from "./ProtectedRoute"
import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/Signup';
import Home from '../pages/Home/Home';
import NotesContiner from '../components/NotesContainer/NotesContiner';
import ArchiveContainer from '../components/ArchiveContainer/ArchiveContainer';
import TrashContainer from '../components/TrashContainer/TrashContainer';

function Route() {

    const appRoute = createBrowserRouter([
        {
            path: "/",
            element: <AuthRoute> <Login /> </AuthRoute>
        },
        {
            path: "/signup",
            element: <AuthRoute> <Signup /> </AuthRoute> 
        },
        {
            path: "/home",
            element: <ProtectedRoute> <Home /> </ProtectedRoute>,
            children: [
                {
                    path: "notes",
                    element: <NotesContiner />
                },
                {
                    path: "archive",
                    element: <ArchiveContainer />
                },
                {
                    path: "trash",
                    element: <TrashContainer />
                }
            ]
        }
    ]);

    return <RouterProvider router={appRoute} />;
}

export default Route;