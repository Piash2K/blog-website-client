import React from 'react';
import RecentBlogs from './RecentBlogs';
import Newsletter from './Newsletter';
import Footer from './Footer';
import RecentComments from './RecentComments';

const Home = () => {
    return (
        <div>
            <RecentBlogs></RecentBlogs>
            <RecentComments></RecentComments>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;