const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000 ;
const url = "mongodb://localhost:27017"


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extented : true}))

app.get("/", (req,res)=>{
    MongoClient.connect(url,{ useNewUrlParser : true, useUnifiedTopology: true}, (err, db) =>{
        if(err) throw err;
        var dbo = db.db("todolist")
        dbo.collection("todos").find({}).toArray((err, result) =>{
            if(err) throw err;
            res.render("index", {work : result})
            db.close()
        })
    })
})
app.post("/",(req,res) =>{
    MongoClient.connect(url,{useNewUrlParser : true, useUnifiedTopology: true},(err, db) =>{
        if(err) throw err;
        var dbo = db.db("todolist")
        dbo.collection("todos").insertOne({ gorev : req.body.gorev}, (err,res) =>{
            if (err) throw err
        })
    })
    res.redirect("http://localhost:3000")
})
app.listen(PORT ,() =>{
    console.log(`${PORT} tında çalışıyor`)
})