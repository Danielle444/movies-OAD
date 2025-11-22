console.log("functions.js loaded");

var BASE_URL = "https://localhost:7185/api/Movies";

var CAST_URL = "https://localhost:7185/api/Casts";

export function renderMovies(moviesArray, showButton) {
var main = document.querySelector("main");
  var html = "";  
  var activeUser = localStorage.getItem("activeUser");
  var isLoggedIn = (activeUser !== null);
  moviesArray.forEach(function (movie) {
    html += `
      <div id=${movie.id} class="movie-card">
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
          (showButton && isLoggedIn)
            ? `
          <button class="add-to-wishlist-btn" data-movie_id="${movie.id}">
            Add to Wish list
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
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.error(err);
    });
}

export function getWishlist() {
  fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderMovies(data, false);
    })
    .catch(function (err) {
      console.error("err --> ", err);
    });
}

export function filterByRatingFromServer(minRating) {
  fetch(BASE_URL + "/" + minRating, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderMovies(data, true);
    })
    .catch(function (err) {
      console.error("err --> ", err);
    });
}

export function filterByDurationFromServer(duration) {
  fetch(BASE_URL + "/duration?duration=" + duration, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderMovies(data, true);
    })
    .catch(function (err) {
      console.error("err --> ", err);
    });
}

export function getCastList() {
  return fetch(CAST_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderCastList(data);
      return data;
    })
    .catch(function (err) {
      console.error("err getCastList -->", err);
    });
}

export function addCast(castMember) {
  return fetch(CAST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(castMember),
  });
}


export function renderCastList(castArray) {
  var container = document.querySelector("#cast-list");
  if (!container) {
    return;
  }

  if (!castArray || castArray.length === 0) {
    container.innerHTML = "<p>No cast members yet.</p>";
    return;
  }

  var html = "";

  castArray.forEach(function (member) {
    html += `
      <div class="cast-card">
        <h3 class="cast-name">${member.name}</h3>
        <p><strong>Role:</strong> ${member.role}</p>
        <p><strong>Country:</strong> ${member.country}</p>
        <p><strong>Date of Birth:</strong> ${formatDate(member.dateOfBirth)}</p>
        <p><strong>Id:</strong> ${member.id}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}



function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  var d = new Date(dateValue);
  if (isNaN(d.getTime())) {
    return dateValue;
  }

  var day = String(d.getDate()).padStart(2, "0");
  var month = String(d.getMonth() + 1).padStart(2, "0");
  var year = d.getFullYear();

  return day + "/" + month + "/" + year;
}

// 1. הגדרת כתובת ה-API החדשה
var USERS_URL = "https://localhost:7185/api/Users"; // ודאי שהפורט תואם לשלך

// 2. פונקציית הרשמה
export function registerUser(userData) {
  return fetch(USERS_URL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
}

// 3. פונקציית התחברות
export function loginUser(loginData) {
  return fetch(USERS_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
}
// פונקציה להוספת סרט חדש
export function insertMovie(movieData) {
  return fetch(BASE_URL, { // משתמש ב-BASE_URL הקיים (api/Movies)
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
}