import { Outlet } from 'react-router-dom';
import Navbar from '../Header/Navbar';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
                <div className='container mx-auto '>
                    <Outlet></Outlet>
                </div>
            </header>
        </div>
    );
};

export default HomeLayout;