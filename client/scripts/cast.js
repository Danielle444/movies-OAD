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

  var idRegex = /^[1-9]\d*$/;
  if (!idRegex.test(id)) {
    formIsValid = false;
    idInput.classList.add("input-error");
  }

  var nameRegex = /^[A-Za-z\s]{2,50}$/;
  if (!nameRegex.test(name)) {
    formIsValid = false;
    nameInput.classList.add("input-error");
  }

  var roleRegex = /^[A-Za-z\s]{2,50}$/;
  if (!roleRegex.test(role)) {
    formIsValid = false;
    roleInput.classList.add("input-error");
  }

  var countryRegex = /^[A-Za-z\s]{2,50}$/;
  if (!countryRegex.test(country)) {
    formIsValid = false;
    countryInput.classList.add("input-error");
  }

  if (!dob) {
    formIsValid = false;
    dobInput.classList.add("input-error");
  }

  if (!formIsValid) {
    alert("Please fix the highlighted fields.");
    return;
  }

  var cast = {
    Id: parseInt(id),
    Name: name,
    Role: role,
    DateOfBirth: dob,
    Country: country
  };

  addCast(cast);
  event.target.reset();
}

function clearErrors(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("input-error");
  }
}
