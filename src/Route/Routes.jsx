import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import Register from "../Authentications/Register";
import Login from "../Authentications/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element:<RootLayout></RootLayout>,
        errorElement:<Error></Error>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

export default router;