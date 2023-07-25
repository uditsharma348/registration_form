const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs")
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const templatePath =  path.join(__dirname,"./template/views")
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017")
app.use(express.static(templatePath))
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

async function get(){
    await client.connect();
}
get();
app.get("/",(req,res)=>{
     res.render("index");
})
app.post("/registation",(req,res)=>{
     res.redirect('/');
     const dataBase = client.db("form-member");
     const coll = dataBase.collection("information");
     const doc = req.body;
     coll.insertOne(doc)
     
})

app.listen(port,()=>{
     console.log(`server start at port number ${port}`);
})