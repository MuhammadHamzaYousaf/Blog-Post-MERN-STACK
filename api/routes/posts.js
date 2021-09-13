const router = require('express').Router();
const Post =require('../models/Post');
const User = require('../models/User');
const Category =require('../models/Category');


// Create Post 

router.post('/',async (req,res)=>{
    const newPost= new Post(req.body);
    try {
        const savePost=await newPost.save();
        res.status(201).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
});



// Update Post 

router.put('/:_id',async (req,res)=>{
     try {
         const post = await Post.findById(req.params._id);
        if(post.username===req.body.username){
                try { 
                    const updatePost= await Post.findByIdAndUpdate(req.params._id,{
                    $set:req.body,
                },{new:true});
                res.status(200).json(updatePost);
             }catch (error) {
                res.status(500).json(error);
                }
        } 
        else{
            res.status(403).json("You can Update only your post");
        }
     } catch (error) {
         res.status(500).json(error);
     }
})


// Delete Post

router.delete('/:_id',async (req,res)=>{
    try {
        const post = await Post.findById(req.params._id);
        try {
            if(post.username===req.body.username){
                // Both Line Use delete and findByIdAndDelete 
                await Post.findByIdAndDelete(req.params._id);
                // await post.delete()
                res.status(200).json("Post Deleted Successfully");
            }
            else{
                res.status(403).json("You can Delete only Your Post");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})



// Get One Post 
router.get('/:_id',async (req,res)=>{
    try {
        const post = await Post.findById(req.params._id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get All Posts Specific UserName or Specific Catogoery

router.get('/',async (req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
try {
    let posts;
    if(username){
        posts= await Post.find({username});
    } else if(catName){
        posts=await Post.find({categories:{
            $in:[catName]
        }});
    }
    else{
        posts= await Post.find();
    }
    res.status(200).json(posts);
} catch (error) {
    res.status(500).json(error);
}
})


module.exports=router;