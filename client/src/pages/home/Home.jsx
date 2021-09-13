import React,{useEffect, useState} from 'react'
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sidebar/SideBar';
import axios from 'axios';
import './home.css';
import { useLocation } from 'react-router';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    useEffect(() => {
        const fetchPost=async ()=>{
            const res=await axios.get("posts"+search);
            setPosts(res.data);
        }
        fetchPost();
    }, [search])

    return (
        <>
        <Header/>
        <div className="home">
            <Posts posts={posts}/>
            <SideBar/>
        </div>
        </>
    )
}

export default Home
