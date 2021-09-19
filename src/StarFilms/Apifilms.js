require('dotenv/config');
const express = require('express')
const app = express()
const cors = require('cors')
const film = require('./src/film.js');
app.use(cors())


app.get('/trending', async(req, res) => {
    const filme = await film.getTrending()
    if (filme == undefined) {
        res.status(400).send()
    } else {
        res.status(200).send(filme)
    }    
}) 


app.listen(3003, function(){
    console.log('APP rodando na porta 3003');
  });

