import React from 'react';
import RecentBlogs from './RecentBlogs';
import Newsletter from './Newsletter';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <RecentBlogs></RecentBlogs>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;