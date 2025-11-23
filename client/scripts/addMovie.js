import { insertMovie } from "./functions.js";

if (!localStorage.getItem("activeUser")) {
  alert("Access Denied! You must be logged in to add movies.");
  window.location.href = "login.html";
}

var form = document.getElementById("add-movie-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  var title = document.getElementById("m-title").value.trim();
  var rating = parseFloat(document.getElementById("m-rating").value);
  var duration = parseInt(document.getElementById("m-duration").value);
  var year = parseInt(document.getElementById("m-year").value);
  var income = parseFloat(document.getElementById("m-income").value);
  var language = document.getElementById("m-language").value.trim();
  var genre = document.getElementById("m-genre").value.trim();
  var desc = document.getElementById("m-desc").value.trim();
  var photo = document.getElementById("m-photo").value.trim();

  var errors = [];

  var titleRegex = /^.{2,100}$/;
  if (!titleRegex.test(title)) {
    errors.push("Title must be at least 2 characters long.");
  }

  if (isNaN(duration) || duration <= 0) {
    errors.push("Duration must be a positive number.");
  }

  if (isNaN(income) || income < 0) {
    errors.push("Income must be a non-negative number.");
  }

  var textRegex = /^[A-Za-z\s]{2,50}$/;
  if (!textRegex.test(language)) {
    errors.push("Language must contain only letters and spaces (2-50 characters).");
  }

  if (!textRegex.test(genre)) {
    errors.push("Genre must contain only letters and spaces (2-50 characters).");
  }

  if (desc.length < 5) {
    errors.push("Description must be at least 5 characters long.");
  }

  var urlRegex = /^https?:\/\/.+/;
  if (!urlRegex.test(photo)) {
    errors.push("Photo URL must start with http or https.");
  }

  var currentYear = new Date().getFullYear();
  if (isNaN(year) || year < 1900 || year > currentYear + 1) {
    errors.push("Year must be between 1900 and " + (currentYear + 1) + ".");
  }

  if (isNaN(rating) || rating < 0 || rating > 10) {
    errors.push("Rating must be between 0 and 10.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  var movieObj = {
    Title: title,
    Rating: rating,
    Income: income,
    ReleaseYear: year,
    Duration: duration,
    Language: language,
    Genre: genre,
    Description: desc,
    PhotoUrl: photo
  };

  insertMovie(movieObj)
    .then(function (res) {
      if (res.ok) {
        alert("Movie added successfully!");
        window.location.href = "index.html";
      } else {
        alert("Error adding movie. Status: " + res.status);
        console.error(res);
      }
    })
    .catch(function (err) {
      console.error("Network error:", err);
      alert("Could not connect to server.");
    });
});
