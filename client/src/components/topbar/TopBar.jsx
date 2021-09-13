import React, { useContext } from 'react'
import './topbar.css';
import {Link} from 'react-router-dom';
import { Context } from '../../context/Context';
import { Logout } from '../../context/Actions';
const TopBar = () => {
    
    const {user,dispatch} = useContext(Context);

    const handlelogout=()=>{
        dispatch(Logout());
    }
    
    return (
        <div className="top">
            <div className="topleft">
                <i className="topicon fab fa-facebook-square" />
                <i className="topicon fab fa-twitter-square" />
                <i className="topicon fab fa-pinterest-square" />
                <i className="topicon fab fa-instagram-square" />
            </div>

            <div className="topcenter">
                <ul className="toplist">
                    <Link to="/" className="link"><li className="toplistitem">Home</li></Link>
                    <Link to="/about" className="link"><li className="toplistitem">About</li></Link>
                    <Link to="/contact" className="link"><li className="toplistitem">Contact</li></Link>
                    <Link to="write" className="link"><li className="toplistitem">Write</li></Link>
                    <li className="toplistitem" onClick={handlelogout}>{user && "logout"}</li>
                </ul>
            </div>

            <div className="topright">
                {
                    user ? (
                        <Link to="/seeting">
                        <img src={user.profilePic || "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"} 
                        className="topprofilepic" alt="" />
                        </Link>
                    ):(
                        <>
                            <ul className="toplist">
                                <Link to="/login" className="link"><li className="toplistitem">Login</li></Link>
                                <Link to="/register" className="link"><li className="toplistitem">Register</li></Link>
                            </ul>
                        </>
                    )
                }
                
                <i className="topsearchicon fas fa-search" />
            </div>
        </div>
    )
}

export default TopBar
