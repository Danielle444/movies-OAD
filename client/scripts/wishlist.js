import { getWishlist } from "./functions.js";

console.log("wishlist.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  handleUserAuth();
  getWishlist();
});

function handleUserAuth() {
  var activeUser = localStorage.getItem("activeUser");
  var loginLink = document.querySelector("#nav-login");
  var logoutLink = document.querySelector("#nav-logout");
  var addMovieLink = document.querySelector("#nav-add-movie");
  var greeting = document.querySelector("#user-greeting");

  if (activeUser) {
    var user = JSON.parse(activeUser);

    if (loginLink) {
      loginLink.style.display = "none";
    }
    if (logoutLink) {
      logoutLink.style.display = "inline";
    }
    if (addMovieLink) {
      addMovieLink.style.display = "inline";
    }
    if (greeting) {
      greeting.textContent = "Hello, " + user.userName;
      greeting.style.display = "inline";
    }

    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
      });
    }
  } else {
    if (loginLink) {
      loginLink.style.display = "inline";
}
    if (logoutLink) {
      logoutLink.style.display = "none";
    }
    if (addMovieLink) {
      addMovieLink.style.display = "none";
    }
    if (greeting) {
      greeting.style.display = "none";
    }
  }
}

function logout() {
  localStorage.removeItem("activeUser");
  alert("You have logged out.");
  window.location.reload();
}
