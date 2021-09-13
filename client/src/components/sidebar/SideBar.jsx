import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
const SideBar = () => {
    const [cat, setCat] = useState([]);

    useEffect(() => {
        const fetchCategories=async ()=>{
            const res=await axios.get('categories');
            setCat(res.data);
        }
        fetchCategories();
    }, [])
    
    return (
        <div className="sidebar">
            <div className="sidebaritem">
                <span className="sidebartitle">About Me</span>
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse deleniti,
                    voluptas architecto tempora nemo a quos veritatis,</p>
            </div>
            <div className="sidebaritem">
                <span className="sidebartitle">Categories</span>
                <ul className="sidebarlist">
                    {
                        cat.map((category)=>(
                        <Link to={`/?cat=${category.name}`} className="link"><li className="sidebarlistitem">{category.name}</li></Link>
                        
                    ))}
                    
                </ul>
            </div>
            <div className="sidebaritem">
                <span className="sidebartitle">Follow Us</span>
                <div className="sidebarSocial">
                    <i className="sidebaricon fab fa-facebook-square"/>
                    <i className="sidebaricon fab fa-twitter-square"/>
                    <i className="sidebaricon fab fa-pinterest-square"/>
                    <i className="sidebaricon fab fa-instagram-square"/>
                </div>
            </div>
        </div>
    )
}

export default SideBar
