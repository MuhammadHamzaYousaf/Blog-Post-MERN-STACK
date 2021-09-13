import React from 'react'
import './header.css';
const Header = () => {
    return (
        <div className="header">
            <div className="headerTitle">
                <span className="headertitlesmall">React & Node</span>
                <span className="headertitlelarge">Blog</span>
            </div>
            <img src="https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="headerimg" alt="" />

        </div>
    )
}

export default Header
