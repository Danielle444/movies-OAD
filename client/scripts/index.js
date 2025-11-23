import {
  renderMovies,
  filterByRatingFromServer,
  filterByDurationFromServer,
  getAllMovies,
  addMovieIdToWishlist,
} from "./functions.js";


console.log("index.js loaded");
handleUserAuth();
loadMoviesFromServer();
attachFilterEvents();

function loadMoviesFromServer() {
  getAllMovies()
    .then(function (moviesFromServer) {
      console.log("movies from server:", moviesFromServer);
      renderMovies(moviesFromServer, true);
      attachWishlistButtons();
    })
    .catch(function (err) {
      console.error("Error loading movies from server --> ", err);
      alert(
        "Error loading movies from server. Check if the server is running."
      );
    });
}

function attachWishlistButtons() {
  var buttons = document.querySelectorAll(".add-to-wishlist-btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-movie_id"));
      addMovieIdToWishlist(id);
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
    loadMoviesFromServer();
    return;
  }

  filterByRatingFromServer(value);
}

function filterDurationHandler() {
  var value = parseInt(document.querySelector("#duration").value);

  if (isNaN(value)) {
    loadMoviesFromServer();
    return;
  }

  filterByDurationFromServer(value);
}

function showAllHandler() {
  loadMoviesFromServer();

  document.querySelector("#min-rating").value = "";
  document.querySelector("#duration").value = "";
}


function handleUserAuth() {
  var activeUser = localStorage.getItem("activeUser");
  var loginLink = document.querySelector("#nav-login");
  var logoutLink = document.querySelector("#nav-logout");
  var addMovieLink = document.querySelector("#nav-add-movie");
  var greeting = document.querySelector("#user-greeting");

  if (activeUser) {
    // --- מצב מחובר ---
    var user = JSON.parse(activeUser);

    // 1. הסתרת כפתור התחברות והצגת התנתקות
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";

    // 2. הצגת כפתור הוספת סרט
    if (addMovieLink) addMovieLink.style.display = "inline";

    // 3. הצגת שם המשתמש
    if (greeting) {
      greeting.textContent = "Hello, " + user.userName; // ודאי שזה תואם לשדה שחוזר מהשרת (UserName/userName)
      greeting.style.display = "inline";
    }

    // 4. הגדרת אירוע התנתקות
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  } else {
    // --- מצב אורח ---
    if (loginLink) loginLink.style.display = "inline";
    if (logoutLink) logoutLink.style.display = "none";
    if (addMovieLink) addMovieLink.style.display = "none";
    if (greeting) greeting.style.display = "none";
  }
}

function logout() {
  // מחיקת המשתמש מהזיכרון
  localStorage.removeItem("activeUser");
  alert("You have logged out.");
  // רענון הדף כדי שהשינויים ייכנסו לתוקף
  window.location.reload();
}
