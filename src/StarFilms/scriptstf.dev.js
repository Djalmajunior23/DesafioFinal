"use strict";

//Projeto Stars Films
var API_KEY = 'api_key=a61e6b7e377522bc7e59a96ac711d9e0';
var BASE_URL = 'https://api.themoviedb.org/3';
var API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
var IMG_URL = 'https://image.tmdb.org/t/p/w500';
var searchURL = BASE_URL + '/search/movie?' + API_KEY;

var genres = [{
  "id": 28,
  "name": "Action"
}, {
  "id": 12,
  "name": "Adventure"
}, {
  "id": 16,
  "name": "Animation"
}, {
  "id": 35,
  "name": "Comedy"
}, {
  "id": 80,
  "name": "Crime"
}, {
  "id": 99,
  "name": "Documentary"
}, {
  "id": 18,
  "name": "Drama"
}, {
  "id": 10751,
  "name": "Family"
}, {
  "id": 14,
  "name": "Fantasy"
}, {
  "id": 36,
  "name": "History"
}, {
  "id": 27,
  "name": "Horror"
}, {
  "id": 10402,
  "name": "Music"
}, {
  "id": 9648,
  "name": "Mystery"
}, {
  "id": 10749,
  "name": "Romance"
}, {
  "id": 878,
  "name": "Science Fiction"
}, {
  "id": 10770,
  "name": "TV Movie"
}, {
  "id": 53,
  "name": "Thriller"
}, {
  "id": 10752,
  "name": "War"
}, {
  "id": 37,
  "name": "Western"
}];
var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');
var tagsEl = document.getElementById('tags');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var current = document.getElementById('current');
var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;
var selectedGenre = [];
setGenre();

function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach(function (genre) {
    var t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', function () {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach(function (id, idx) {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }

      console.log(selectedGenre);
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

function highlightSelection() {
  var tags = document.querySelectorAll('.tag');
  tags.forEach(function (tag) {
    tag.classList.remove('highlight');
  });
  clearBtn();

  if (selectedGenre.length != 0) {
    selectedGenre.forEach(function (id) {
      var hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add('highlight');
    });
  }
}

function clearBtn() {
  var clearBtn = document.getElementById('clear');

  if (clearBtn) {
    clearBtn.classList.add('highlight');
  } else {
    var clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', function () {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    });
    tagsEl.append(clear);
  }
}

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.results);

    if (data.results.length !== 0) {
      showMovies(data.results);
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;
      current.innerText = currentPage;

      if (currentPage <= 1) {
        prev.classList.add('disabled');
        next.classList.remove('disabled');
      } else if (currentPage >= totalPages) {
        prev.classList.remove('disabled');
        next.classList.add('disabled');
      } else {
        prev.classList.remove('disabled');
        next.classList.remove('disabled');
      }

      tagsEl.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      main.innerHTML = "<h1 class=\"no-results\">No Results Found</h1>";
    }
  });
}

function showMovies(data) {
  main.innerHTML = '';
  data.forEach(function (movie) {
    var title = movie.title,
        poster_path = movie.poster_path,
        vote_average = movie.vote_average,
        overview = movie.overview,
        id = movie.id;
    var movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = "\n             <img src=\"".concat(poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580", "\" alt=\"").concat(title, "\">\n            <div class=\"movie-info\">\n                <h3>").concat(title, "</h3>\n                <span class=\"").concat(getColor(vote_average), "\">").concat(vote_average, "</span>\n            </div>\n            <div class=\"overview\">\n                <h3>Overview</h3>\n                ").concat(overview, "\n                <br/> \n                <button class=\"know-more\" id=\"").concat(id, "\">Know More</button\n            </div>\n        \n        ");
    main.appendChild(movieEl);
    document.getElementById(id).addEventListener('click', function () {
      console.log(id);
      openNav(movie);
    });
  });
}

var overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */

function openNav(movie) {
  var id = movie.id;
  fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(function (res) {
    return res.json();
  }).then(function (videoData) {
    console.log(videoData);

    if (videoData) {
      document.getElementById("myNav").style.width = "100%";

      if (videoData.results.length > 0) {
        var embed = [];
        var dots = [];
        videoData.results.forEach(function (video, idx) {
          var name = video.name,
              key = video.key,
              site = video.site;

          if (site == 'YouTube') {
            embed.push("\n              <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/".concat(key, "\" title=\"").concat(name, "\" class=\"embed hide\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n          \n          "));
            dots.push("\n              <span class=\"dot\">".concat(idx + 1, "</span>\n            "));
          }
        });
        var content = "\n        <h1 class=\"no-results\">".concat(movie.original_title, "</h1>\n        <br/>\n        \n        ").concat(embed.join(''), "\n        <br/>\n        <div class=\"dots\">").concat(dots.join(''), "</div>\n        \n        ");
        overlayContent.innerHTML = content;
        activeSlide = 0;
        showVideos();
      } else {
        overlayContent.innerHTML = "<h1 class=\"no-results\">No Results Found</h1>";
      }
    }
  });
}
/* Close when someone clicks on the "x" symbol inside the overlay */


function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos() {
  var embedClasses = document.querySelectorAll('.embed');
  var dots = document.querySelectorAll('.dot');
  totalVideos = embedClasses.length;
  embedClasses.forEach(function (embedTag, idx) {
    if (activeSlide == idx) {
      embedTag.classList.add('show');
      embedTag.classList.remove('hide');
    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show');
    }
  });
  dots.forEach(function (dot, indx) {
    if (activeSlide == indx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

var leftArrow = document.getElementById('left-arrow');
var rightArrow = document.getElementById('right-arrow');
leftArrow.addEventListener('click', function () {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = totalVideos - 1;
  }

  showVideos();
});
rightArrow.addEventListener('click', function () {
  if (activeSlide < totalVideos - 1) {
    activeSlide++;
  } else {
    activeSlide = 0;
  }

  showVideos();
});

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return "orange";
  } else {
    return 'red';
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var searchTerm = search.value;
  selectedGenre = [];
  setGenre();

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
prev.addEventListener('click', function () {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});
next.addEventListener('click', function () {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  var urlSplit = lastUrl.split('?');
  var queryParams = urlSplit[1].split('&');
  var key = queryParams[queryParams.length - 1].split('=');

  if (key[0] != 'page') {
    var url = lastUrl + '&page=' + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    var a = key.join('=');
    queryParams[queryParams.length - 1] = a;
    var b = queryParams.join('&');

    var _url = urlSplit[0] + '?' + b;

    getMovies(_url);
  }
}