const express = require('express');
const getData = require('./node_files/getData.js');

const app = express();

app.get('/',(req,res)=>{
    res.send("Welcome!!")
})


app.get('/search', (req, res)=>{

    if(!req.query.title){
        return res.send({
            error : "Please enter the title!"
        })
    }

    getData(req.query.title, (data)=>{
        res.send(data);
    })
})


app.listen(3000, "0.0.0.0", ()=>{
    console.log("server is up")
})
