import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from './Components/Layouts/HomeLayout';
import ErrorPage from './Components/Pages/ErrorPage';
import Register from './Components/Pages/Register';
import Login from './Components/Pages/Login';
import AuthProvider from './Components/Provider/AuthProvider';
import AddBlog from './Components/Pages/AddBlog';
import RecentBlogs from './Components/Pages/RecentBlogs';
import Home from './Components/Pages/Home';
import AllBlogs from './Components/Pages/AllBlogs';
import FeaturedBlogs from './Components/Pages/FeaturedBlogs';
import BlogDetails from './Components/Pages/BlogDetails';
import WishList from './Components/Pages/WishList';
import UpdateBlog from './Components/Pages/UpdateBlog';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/addBlog',
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
      },
      {
        path: '/allBlogs',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: '/featuredBlogs',
        element: <FeaturedBlogs></FeaturedBlogs>
      },
      {
        path: "/blogs/:id",
        element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://blog-website-server-nine.vercel.app/blogs/${params.id}`,{
          credentials: "include",
        }),
      },
      {
        path: "/wishlist",
        element: <PrivateRoute> <WishList></WishList></PrivateRoute>
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
        loader: ({ params }) => fetch(`https://blog-website-server-nine.vercel.app/update/${params.id}`, {
          credentials: "include",
        }),
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
