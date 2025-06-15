import { useEffect } from "react";
import { useLocation } from "react-router";

const TitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // Static route-to-title map
        const routeTitles = {
            "/": "Home - Skill Stack",
            "/login": "Login - Skill Stack",
            "/register": "Register - Skill Stack",
            "/courses": "Courses - Skill Stack",
            "/add-course": "Add Course - Skill Stack",
            "/manageCourses": "Manage Courses - Skill Stack",
            "/my-enrolled-courses": "My Enrollments - Skill Stack",
        };

        let title = routeTitles[path];

        // Handle dynamic routes
        if (path.startsWith("/edit-course/")) {
            title = "Edit Course - Skill Stack";
        } else if (path.startsWith("/course-details/")) {
            title = "Course Details - Skill Stack";
        }

        // Fallback title
        document.title = title || "Skill Stack";

    }, [location]);

    return null;
};

export default TitleManager;
