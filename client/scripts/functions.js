console.log("functions.js loaded");

var BASE_URL = "https://localhost:7185/api/Movies";

export function renderMovies(moviesArray, showButton) {
  var main = document.querySelector("main");
  var html = "";

  moviesArray.forEach(function (movie) {
    html += `
      <div class="movie-card">
        <img class="movie-img" src="${movie.photoUrl}" alt="${movie.title}">
        <h2 class="movie-title">${movie.title}</h2>
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Income:</strong> $${movie.income.toLocaleString()}</p>
        <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
        <p><strong>Duration:</strong> ${movie.duration} min</p>
        <p><strong>Language:</strong> ${movie.language}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p class="movie-description">${movie.description}</p>
        ${
          showButton
            ? `
          <button class="add-to-wishlist-btn" data-id="${movie.id}">
            List Wish to Add
          </button>
        `
            : ""
        }
      </div>
    `;
  });

  main.innerHTML = html;
}

export function addMovie(movie) {
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

export function getWishlist() {
  fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => renderMovies(data, false))
    .catch((err) => console.error("err --> ", err));
}

export function filterByRatingFromServer(minRating) {
  fetch(`${BASE_URL}/${minRating}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => renderMovies(data, true))
    .catch((err) => console.error("err --> ", err));
}

export function filterByDurationFromServer(maxDuration) {
  fetch(`${BASE_URL}/duration?maxD=${maxDuration}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => renderMovies(data, true))
    .catch((err) => console.error("err --> ", err));
}
