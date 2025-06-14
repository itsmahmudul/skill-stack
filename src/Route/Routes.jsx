import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import Register from "../Authentications/Register";
import Login from "../Authentications/Login";
import Courses from "../Pages/Courses";
import AddCourses from "../Pages/AddCourses";
import PrivetRouts from "./PrivateRoutes";
import ManageCoursePage from "../Pages/ManageCoursePage";
import EditCourse from "../Pages/Manage/EditCourse";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,
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
            },
            {
                path: '/courses',
                element: <Courses></Courses>
            },
            {
                path: '/edit-course/:id',
                element: <PrivetRouts><EditCourse></EditCourse></PrivetRouts>
            },
            {
                path: '/add-course',
                element: <PrivetRouts><AddCourses></AddCourses></PrivetRouts>
            },
            {
                path: '/manageCourses',
                element: <PrivetRouts><ManageCoursePage></ManageCoursePage></PrivetRouts>
            }
        ]
    }
])

export default router;