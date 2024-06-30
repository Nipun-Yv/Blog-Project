import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
const port=3000;
const app=express();
var t=[];
var s;
var f=['If a story is in you, it has to come out','I love writing. I love the swirl and swing of words as they tangle with human emotions.','Your intuition knows what to write, so get out of the way.'
,'A writer, I think, is someone who pays attention to the world.','The scariest moment is always just before you start.','And now that you dont have to be perfect, you can be good.']
function ConstructorInner(blogs,password){
    this.blogs=blogs;
    this.password=password;
}
function parseForMe(x){
    var t="Password: ";
    t+=x.password;
    t+="\n\n";
    for(var i=0;i<x.blogs.length;i++){
        t+=x.blogs[i][0];
        t+="\n";
        t+=x.blogs[i][1];
        t+="\n\n";
    }
    return t;
}
app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended:true}))

app.listen(port,()=>{
    console.log("Server running successfully and recieving requests throught port "+port);
})
app.get("/",(req,res)=>{
    res.render("login.ejs");
})
app.get("/home",(req,res)=>{
    res.send("Unauthorised access, I'm gonna need you to login first!")
})
app.post("/home",(req,res)=>{
    var quote=f[Math.floor(Math.random()*f.length)];
    if(req.body.delete){
        s=req.body.delete.slice(1,400);
        var d=Number(req.body.delete[0]);
        for(var i=d;i<t[s].blogs.length-1;i++){
            t[s].blogs[i]=t[s].blogs[i+1];
        }
        t[s].blogs.pop();
        fs.writeFile("./"+s+".txt",parseForMe(t[s]),(err)=>{if(err)throw err});
        res.render("home.ejs",{Name:s,Blogs:t[s].blogs,Quote:quote})
        return;
    }
    if(req.body.back){
        s=req.body.back;
        res.render("home.ejs",{Name:s,Blogs:t[s].blogs,Quote:quote});
        return;
    }
    if(req.body.name){
    s=req.body.name;
    if(!t[s]){
        t[s]=new ConstructorInner([],req.body.password)
        t[s].blogs.push(["Hello There!","Click on me and then choose edit to reveal more and get help regarding the website:\nWelcome to YouBlog, to create new posts, click on the plus icon on the home page \nTo edit any post, simply click on the post and the option to edit/delete the post will appear\n. Also you can only create 9 blog posts"])
        res.render("home.ejs",{Name:s,Blogs:t[s].blogs,Quote:quote})
        fs.writeFile(s+".txt",parseForMe(t[s]),(err)=>{if(err) throw err;});
        console.log("Login Detected:"+s)
    }
    else if(t[s].password==req.body.password){
        res.render("home.ejs",{Name:s,Blogs:t[s].blogs,Quote:quote})
    }
    else{
        res.render("login.ejs",{invalid:1})
    }
}
    else{
        s=req.body.number.slice(1,400);
        if(Number(req.body.number[0])==t[s].blogs.length && Number(req.body.number[0])!=9){
        t[s].blogs.push([req.body.title,req.body.content])}
        else if(Number(req.body.number[0])==9){
            res.render("home.ejs",{Name:s,Blogs:t[s].blogs,Quote:quote});
        }
        else{
            t[s].blogs[Number(req.body.number[0])][0]=req.body.title;
            t[s].blogs[Number(req.body.number[0])][1]=req.body.content;
        }
        res.render("home.ejs",{Name:s,Blogs:t[s].blogs,Quote:quote});
        fs.writeFile(s+".txt",parseForMe(t[s]),(err)=>{if(err) throw err;});
    }
})
app.post("/view",(req,res)=>{
    if(req.body.number[0]<'0' || req.body.number[0]>'9'){
        s=req.body.number;
        res.render("view.ejs",{Name:s,Title:"",Content:"",Num:t[s].blogs.length.toString()})
    }
    else{
        s=req.body.number.slice(1,400);
        res.render("view.ejs",{Name:s,Title:t[s].blogs[Number(req.body.number[0])][0],Content:t[s].blogs[Number(req.body.number[0])][1],Num:req.body.number[0]})
    }
}) 