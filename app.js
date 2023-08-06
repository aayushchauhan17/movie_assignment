const express = require('express');
const getData = require('./node_files/getData.js');

const app = express();

app.get('/',(req,res)=>{
    res.send("Welcome!!")
})

const port = process.env.PORT || 3000;


app.get('/search', (req, res)=>{

    if(!req.query.title){
        return res.send({
            error : "Please enter the title!"
        })
    }

    getData(req.query.title, (data)=>{
        res.status(200).send(data);
    })
})


app.listen(port, "0.0.0.0", ()=>{
    console.log("server is up " + port)
})
