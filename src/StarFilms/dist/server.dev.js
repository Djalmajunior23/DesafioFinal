"use strict";

require('dotenv/config');

var express = require('express');

var axios = require('axios');

var API_KEY = process.env.API_KEY;
var BASE_URL = 'https://api.themoviedb.org/3';

var _require = require('./connection'),
    databaseconnection = _require.databaseconnection;

function getTrending() {
  var _ref, data;

  return regeneratorRuntime.async(function getTrending$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios("".concat(BASE_URL, "/trending/all/week?language=pt-BR&api_key=").concat(API_KEY)));

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function trackActivity(query) {
  var logQuery, reulst;
  return regeneratorRuntime.async(function trackActivity$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          logQuery = {
            search_term: query
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(databaseconnection('movies').insert(query));

        case 3:
          reulst = _context2.sent;
          return _context2.abrupt("return", result);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  getTrending: getTrending
}, {
  trackActivity: trackActivity
};