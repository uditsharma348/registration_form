const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs")
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const async = require("hbs/lib/async");
const { emit } = require("process");
const templatePath = path.join(__dirname, "./template/views")
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017")
app.use(express.static(templatePath))
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

async function get() {
     await client.connect();
}
get();
app.get("/", (req, res) => {
     res.render("index");
})
app.get("/update", (req, res) => {
     res.render("update");
})
app.get("/find", async (req, res) => {
     const dataBase = client.db("form-member");
     const coll = dataBase.collection("information");
     const data = req.query;
     console.log(data)
     const result = await coll.findOne(data)
     console.log(result)
     res.render("view", { result });
})
app.post("/registation", async (req, res) => {
     res.redirect('/');
     const dataBase = client.db("form-member");
     const coll = dataBase.collection("information");
     const doc = req.body;
     await coll.insertOne(doc);
})
app.get("/delete", async (req, res) => {
     res.redirect('/');
     const dataBase = client.db("form-member");
     const coll = dataBase.collection("information");
     const doc = req.query;
     const del = await coll.deleteOne(doc);
     console.log("delete successfully");

})
app.post("/update", async (req, res) => {
     const dataBase = client.db("form-member");
     const coll = dataBase.collection("information");
     console.log(req.body)
     const fullName = req.body.fullName;
     const password = req.body.password;
     const radio = req.body.radio;
     const name = req.body.name;
     const Number = req.body.Number;
     const confpassword = req.body.confpassword;
     const options = { upsert: true }
     const doc = {
          "$set": {
               fullName,
               password,
               radio,
               name,
               Number,
               confpassword
          }
     }
     const data = await coll.updateOne({email:req.body.email},doc,options)
     res.redirect('/');
})


app.listen(port, () => {
     console.log(`server start at port number ${port}`);
})