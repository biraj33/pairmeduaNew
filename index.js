//jshint esversion:6""
const express = require("express");
const bodyParser  = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/testDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://admin_biraj:Test123@atlascluster.skvmtce.mongodb.net/testDB", {useNewUrlParser:true});

const app = express();




const messageSchema = new mongoose.Schema({
    name : String,
    email :String,
    subject: String,
    message :String
    
});

const Message = mongoose.model('Message', messageSchema);

// const videoSchema = new mongoose.Schema({
//     title: String,
//     link: String
// });

// const Video = mongoose.model('Video', videoSchema);


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));


app.get("/", function(req, res){

    
        res.render("body");
    
    
})




// admin pannel and req

app.get("/loggedin/home", function(req, res){
    
    res.render("admin",{page:"home"});
});

app.get("/loggedin/message", function(req, res){
    
    Message.find({}).then(function(result){

    res.render("admin",{page: "message",message : result});
    
    })
});

// app.get("/loggedin/video", function(req, res){

    
//     Video.find({}).then(function(result){
        
//         res.render("admin",{page: "video", video : result});
//     })
    


// });

app.post("/message", function(req, res){
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(req.body.textarea);
    

    const newMessage = new Message({
        name : req.body.name,
        email :req.body.email,
        subject: req.body.subject,
        message :req.body.textarea
    })
    newMessage.save();
    res.redirect("/")
})

app.post("/deleteMessage", function(req, res){
    
    deleteID = req.body.checkbox;
    Message.findByIdAndDelete(deleteID).then(function(data){
        console.log("data is succesfully deteted " + data.name)
    })
    res.redirect("/loggedin/message");
})

// app.post("/videoPost",function(req,res){

//     console.log();
//     console.log();
//     const newVideo  = new Video({
//         title: req.body.title,
//         link: req.body.link
//     });
//     newVideo.save();

//     res.redirect("/loggedin/video");
// })
// app.post("/deleteVideo", function(req, res){
//     deleteID = req.body.checkbox;
//     Video.findByIdAndDelete(deleteID).then(function(data){
//         console.log("data is succesfully deteted " + data.title)
//     })
//     res.redirect("/loggedin/message");
// })

// admin request will be ended here


app.listen(process.env.PORT || 3000, function () {
    console.log("server is started at port 3000");
  });