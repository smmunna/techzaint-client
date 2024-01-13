import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../shared/Login/Login";
import Register from "../shared/Registration/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";
import CreateBlog from "../pages/Dashboard/BlogPage/CreateBlog";
import SingleBlog from "../components/blog/SingleBlog";
import Blogs from "../pages/Blogs/Blogs";
import BlogList from "../pages/Dashboard/BlogPage/BlogList";
import EditBlog from "../pages/Dashboard/BlogPage/EditBlog";
import UserBlogList from "../pages/Dashboard/BlogPage/UserBlogs/UserBlogList";
import VerifyEmail from "../shared/Login/Verification/VerifyEmail";
import SavedItems from "../pages/SavedItems/SavedItems";
import EditUserBlog from "../pages/Dashboard/BlogPage/UserBlogs/EditUserBlog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/saved-items',
                element: <PrivateRoutes><SavedItems /></PrivateRoutes>
            },
            {
                path: '/single-blog/:id',
                element: <SingleBlog />
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
                children: [
                    {
                        path: 'create-blog',
                        element: <PrivateRoutes><CreateBlog /></PrivateRoutes>
                    },
                    {
                        path: 'blog-list',
                        element: <PrivateRoutes><BlogList /></PrivateRoutes>
                    },
                    {
                        path: 'edit-blog/:id',
                        element: <PrivateRoutes><EditBlog /></PrivateRoutes>
                    },
                    {
                        path: 'edit-user-blog/:id',
                        element: <PrivateRoutes><EditUserBlog /></PrivateRoutes>
                    },
                    {
                        path: 'my-blogs',
                        element: <PrivateRoutes><UserBlogList /></PrivateRoutes>
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/verification',
        element: <VerifyEmail />
    },

]);

export default router;