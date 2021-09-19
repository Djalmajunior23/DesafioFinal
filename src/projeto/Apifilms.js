require('dotenv/config');
const express = require('express')
const app = express()
const cors = require('cors')
const films = require('./src/projeto/films.js');
app.use(cors())


app.get('/trending', async(req, res) => {
    const filme = await films.getTrending()
    if (filme == undefined) {
        res.status(400).send()
    } else {
        res.status(200).send(filme)
    }    
}) 


app.listen(3003, function(){
    console.log('APP rodando na porta 3003');
  });

