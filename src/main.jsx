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


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <RecentBlogs></RecentBlogs>
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
        element: <AddBlog></AddBlog>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
