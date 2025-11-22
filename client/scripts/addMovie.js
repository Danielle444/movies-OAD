import { insertMovie } from "./functions.js";

// ========================================================
// 1. אבטחה: בדיקה אם המשתמש מחובר
// ========================================================
if (!localStorage.getItem("activeUser")) {
    alert("Access Denied! You must be logged in to add movies.");
    window.location.href = "login.html";
}

// ========================================================
// 2. טיפול בשליחת הטופס
// ========================================================
document.getElementById("add-movie-form").addEventListener("submit", function(e) {
    e.preventDefault(); // מונע רענון אוטומטי

    // איסוף הנתונים לאובייקט אחד
    // הערה: השמות (Keys) חייבים להיות זהים ל-Properties במחלקה Movie ב-C#
    var movieObj = {
        Title: document.getElementById("m-title").value,
        Rating: parseFloat(document.getElementById("m-rating").value),
        Income: parseFloat(document.getElementById("m-income").value),
        ReleaseYear: parseInt(document.getElementById("m-year").value),
        Duration: parseInt(document.getElementById("m-duration").value),
        Language: document.getElementById("m-language").value,
        Genre: document.getElementById("m-genre").value,
        Description: document.getElementById("m-desc").value,
        PhotoUrl: document.getElementById("m-photo").value
    };

    // בדיקה בסיסית בקונסול לראות שהמידע נאסף נכון
    console.log("Sending movie to server:", movieObj);

    // שליחה לשרת
    insertMovie(movieObj)
        .then(function(res) {
            if (res.ok) {
                alert("Movie added successfully!");
                // מעבר לדף הבית כדי לראות את הסרט החדש
                window.location.href = "index.html"; 
            } else {
                // אם יש שגיאה בשרת (למשל נתונים לא תקינים)
                alert("Error adding movie. Status: " + res.status);
                console.error(res);
            }
        })
        .catch(function(err) {
            console.error("Network error:", err);
            alert("Could not connect to server.");
        });
});