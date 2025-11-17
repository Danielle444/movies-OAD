import { getCastList, addCast } from "./functions.js";

console.log("cast.js loaded");

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init running in cast page");
  var form = document.querySelector("#cast-form");
  if (form) {
    form.addEventListener("submit", onCastSubmit);
  }
  getCastList();
}

function onCastSubmit(event) {
  event.preventDefault();

  var idInput = document.querySelector("#cast-id");
  var nameInput = document.querySelector("#cast-name");
  var roleInput = document.querySelector("#cast-role");
  var dobInput = document.querySelector("#cast-dob");
  var countryInput = document.querySelector("#cast-country");

  var id = idInput.value.trim();
  var name = nameInput.value.trim();
  var role = roleInput.value.trim();
  var dob = dobInput.value;
  var country = countryInput.value.trim();

  clearErrors([idInput, nameInput, roleInput, dobInput, countryInput]);

  var formIsValid = true;
  var errorMessages = [];

  var idRegex = /^[1-9]\d*$/;
  if (!idRegex.test(id)) {
    formIsValid = false;
    idInput.classList.add("input-error");
    errorMessages.push("Id must be a positive whole number (no leading zeros).");
  }

  var nameRegex = /^[A-Za-z\s]{2,50}$/;
  if (!nameRegex.test(name)) {
    formIsValid = false;
    nameInput.classList.add("input-error");
    errorMessages.push("Name must contain only letters and spaces (2-50 characters).");
  }

  var roleRegex = /^[A-Za-z\s]{2,50}$/;
  if (!roleRegex.test(role)) {
    formIsValid = false;
    roleInput.classList.add("input-error");
    errorMessages.push("Role must contain only letters and spaces (2-50 characters).");
  }

  var countryRegex = /^[A-Za-z\s]{2,50}$/;
  if (!countryRegex.test(country)) {
    formIsValid = false;
    countryInput.classList.add("input-error");
    errorMessages.push("Country must contain only letters and spaces (2-50 characters).");
  }

  if (!dob) {
    formIsValid = false;
    dobInput.classList.add("input-error");
    errorMessages.push("Date of birth is required.");
  } else {
    var selectedDate = new Date(dob);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime()) || selectedDate > today) {
      formIsValid = false;
      dobInput.classList.add("input-error");
      errorMessages.push("Date of birth must be a valid date in the past or today.");
    }
  }

  if (!formIsValid) {
    alert(errorMessages.join("\n"));
    return;
  }

  var cast = {
    Id: parseInt(id),
    Name: name,
    Role: role,
    DateOfBirth: dob,
    Country: country
  };

  addCast(cast)
    .then(function (res) {
      if (!res.ok) {
        return res.text().then(function (msg) {
          alert("Error saving cast member: " + msg);
        });
      } else {
        alert("Cast member added successfully.");
        event.target.reset();
        getCastList();
      }
    })
    .catch(function (err) {
      console.error("err addCast -->", err);
      alert("There was a problem saving the cast member.");
    });
}

function clearErrors(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("input-error");
  }
}
