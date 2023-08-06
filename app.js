const express = require('express');
const getData = require('./node_files/getData.js');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
})



app.get('/search', (req, res)=>{

    if(!req.query.title){
        return res.json({
            error : "Please enter the title!"
        })
    }

    getData(req.query.title, (data)=>{
        res.json(data);
    })
})


app.listen(port, "0.0.0.0", ()=>{
    console.log("server is up " + port)
})
