const express = require("express");
const app = express();
const port = 7860;
const path = require("path");

const {v4 : uuidv4} = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts = [
    {
        id:uuidv4(),
        username:"Apna College",
        content:"The harder you work, The luckier you get"
    },
    {
        id:uuidv4(),
        username:"Aman Dhattarwal",
        content:"If you don't sacrifice for what you want , then what you want becomes the sacrifice"
    },
    {
        id:uuidv4(),
        username:"Sami",
        content:"Great things take time to happen"
    }
]
  
app.listen(port,()=>{
    console.log("listening on port",port);
})

app.get("/posts",(req,res)=>{           //index route
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{       //Create route1
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{          //Create route2
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts"); 
})


app.get("/posts/:id",(req,res)=>{       //show route
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id)
    res.render("show.ejs",{post});  
})

app.patch("/posts/:id",(req,res)=>{     //update route
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id === p.id)
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id)
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id)
    res.redirect("/posts");
})




