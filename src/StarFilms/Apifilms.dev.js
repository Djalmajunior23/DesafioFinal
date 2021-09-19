"use strict";

require('dotenv/config');

var express = require('express');

var app = express();

var cors = require('cors');

var film = require('./src/film.js');

app.use(cors());
app.get('/trending', function _callee(req, res) {
  var filme;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(film.getTrending());

        case 2:
          filme = _context.sent;

          if (filme == undefined) {
            res.status(400).send();
          } else {
            res.status(200).send(filme);
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(3003, function () {
  console.log('APP rodando na porta 3003');
});