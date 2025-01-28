import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/Signup';
import Home from '../pages/Home/Home';
import NotesContiner from '../components/NotesContainer/NotesContiner';
import ArchiveContainer from '../components/ArchiveContainer/ArchiveContainer';
import TrashContainer from '../components/TrashContainer/TrashContainer';

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
            element: <Home />,
            children:[
                {
                    path: "notes",
                    element: <NotesContiner/>
                },
                {
                    path: "archive",
                    element: <ArchiveContainer/>
                },
                {
                    path: "trash",
                    element: <TrashContainer/>
                }
            ]
        }
    ]);

    return <RouterProvider router={appRoute} />;
}

export default Route;