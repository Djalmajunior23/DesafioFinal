require('dotenv/config');

const axios = require('axios')
const API_KEY = process.env.API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function getTrending() {
    try {        
        const {data} = await axios(`${BASE_URL}/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
        return data 
    } catch (error) {
        console.error(error)        
    }
}
module.exports = {getTrending}