const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB=require('./config/db.js')
const File = require("./models/File.js");

//express app
const app = express();
const port=process.env.PORT ||8000;

//MiddleWares
app.use(cors());
app.use(express.json())


//Routes
// app.use("/api/files",fileRoutes);
app.post("/api/files",async(req,res)=>{
    const {videoUrl,fileUrl}=req.body;
    // console.log("video",videoUrl)
    // console.log("file",fileUrl)
    
    
        if(!videoUrl || !fileUrl){
            res.send({
                 type:"success",msg:"imgurl and fileurl required!!!"
            })
        }
        try{
    
            const file=await File({
                fileUrl:fileUrl,
                videoUrl: videoUrl
            });
            await file.save();
            res.send({
                data: file,type:"success",msg:"successfully submited!!!"
            })
        }catch(error){
            console.log(error);
            res.send({
                 type:"fail",msg:error
            })
            throw error;
        }
    
})


//listening
app.listen(port, () =>{
    connectDB();
    console.log("server is running at port :" + port);
} );
    


