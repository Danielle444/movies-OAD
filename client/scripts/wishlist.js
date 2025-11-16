import { getWishlist } from "./functions.js";
console.log("wishlist.js loaded");
window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("init running in wishlist page");
  getWishlist();
}
