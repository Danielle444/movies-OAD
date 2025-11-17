import { movies } from "./movies.js";
import {
  renderMovies,
  addMovie,
  filterByRatingFromServer,
  filterByDurationFromServer,
} from "./functions.js";

console.log("index.js loaded");
console.log("number of movies:", movies.length);

  renderMovies(movies, true);
  attachWishlistButtons();
  attachFilterEvents();


function attachWishlistButtons() {
  var buttons = document.querySelectorAll(".add-to-wishlist-btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-movie_id"));
      var movie = movies.find(function (m) {
        return m.id === id;
      });

      if (movie) {
        addMovie(movie);
      }
    });
  });
}

function attachFilterEvents() {
  var btnRating = document.querySelector("#btn-filter-rating");
  var btnDuration = document.querySelector("#btn-filter-duration");
  var btnShowAll = document.querySelector("#btn-show-all");

  if (btnRating) {
    btnRating.addEventListener("click", filterRatingHandler);
  }

  if (btnDuration) {
    btnDuration.addEventListener("click", filterDurationHandler);
  }

  if (btnShowAll) {
    btnShowAll.addEventListener("click", showAllHandler);
  }
}

function filterRatingHandler() {
  var value = parseFloat(document.querySelector("#min-rating").value);

  if (isNaN(value)) {
    renderMovies(movies, true);
    attachWishlistButtons();
    return;
  }

  filterByRatingFromServer(value);
}


function filterDurationHandler() {
  var value = parseInt(document.querySelector("#max-duration").value);
  filterByDurationFromServer(value);
}

function showAllHandler() {
  renderMovies(movies, true);
  attachWishlistButtons();

  document.querySelector("#min-rating").value = "";
  document.querySelector("#max-duration").value = "";
}
