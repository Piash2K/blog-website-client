import React from 'react';
import RecentBlogs from './RecentBlogs';
import Newsletter from './Newsletter';
import Footer from './Footer';
import RecentComments from './RecentComments';
import PopularCategories from './PopularCategories';

const Home = () => {
    return (
        <div>
            <RecentBlogs></RecentBlogs>
            <PopularCategories></PopularCategories>
            <RecentComments></RecentComments>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;