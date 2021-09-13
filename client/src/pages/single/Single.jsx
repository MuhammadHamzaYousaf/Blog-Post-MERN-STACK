import React from 'react';
import './single.css';
import Sidebar from '../../components/sidebar/SideBar';
import SinglePost from '../../components/singlepost/SinglePost';
const Single = () => {
    return (
        <div className="single">
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}

export default Single
