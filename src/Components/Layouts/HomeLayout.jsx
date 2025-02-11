import { Outlet } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Footer from '../Pages/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;