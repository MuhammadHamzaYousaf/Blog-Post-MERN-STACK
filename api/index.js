const express= require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
require('./conn/db');
const path=require('path');
const authRoute = require('./routes/auth');
const usersRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const categoryRoute=require('./routes/categories');
const imageuploadRoute=require('./routes/imageupload');
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);
app.use('/api',imageuploadRoute);

app.listen(process.env.PORT,()=>{
    console.log("Lisining the Port "+process.env.PORT);
});