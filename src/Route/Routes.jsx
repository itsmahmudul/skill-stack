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
import MyEnrolledCoursesPage from "../Pages/MyEnrolledCoursesPage";
import CourseDetails from "../Pages/HomeThings/CourseDetails";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loading.json";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home,
                loader: () =>
                    fetch("https://skill-stack-server.vercel.app/courses"),
                hydrateFallbackElement: (
                    <div className="flex justify-center items-center min-h-[40vh]">
                        <Lottie animationData={loaderAnimation} style={{ width: 150, height: 150 }} />
                    </div>
                ),
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/courses",
                element: <Courses />,
            },
            {
                path: "/edit-course/:id",
                element: (
                    <PrivetRouts>
                        <EditCourse />
                    </PrivetRouts>
                ),
            },
            {
                path: "/add-course",
                element: (
                    <PrivetRouts>
                        <AddCourses />
                    </PrivetRouts>
                ),
            },
            {
                path: "/manageCourses",
                element: (
                    <PrivetRouts>
                        <ManageCoursePage />
                    </PrivetRouts>
                ),
            },
            {
                path: "/my-enrolled-courses",
                element: (
                    <PrivetRouts>
                        <MyEnrolledCoursesPage />
                    </PrivetRouts>
                ),
            },
            {
                path: "/course-details/:id",
                element: (
                    <PrivetRouts>
                        <CourseDetails />
                    </PrivetRouts>
                ),
            },
        ],
    },
]);

export default router;
