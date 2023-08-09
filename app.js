const express = require("express")
const app = express()

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/multer';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function(err) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }
    console.log('Connected to MongoDB');

})

const db = client.db();

app.listen(1000,()=>{
    console.log("server at 1000")
})