const axios = require('axios');

function getData(title, callback){

    const url = `http://www.omdbapi.com/?apikey=ca867095&t=${title}`;


    axios({
        method: 'get',
        url : url,
    }).then((res)=>{
        callback(res.data);
    }).catch((error)=>{
        callback({
            error : "No Data found!",
        });
    })

}


module.exports = getData;