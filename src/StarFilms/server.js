require('dotenv/config');

const express = require('express');
const axios = require('axios')
const API_KEY = process.env.API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const{databaseconnection} = require('./connection')

async function getTrending() {
    try {
        const {data} = await axios(`${BASE_URL}/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
        return data 
    } catch (error) {
        console.error(error)
    }
}

async function trackActivity(query) {

    const logQuery = {
        search_term: query
    }

    const reulst = await databaseconnection('movies').insert(query)
    return result
}

module.exports = {getTrending},{trackActivity}