import { registerUser, loginUser } from "./functions.js";

// ============================================================
// טיפול בהרשמה (Register)
// ============================================================
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // מניעת רענון הדף

    // 1. איסוף הנתונים מהטופס
    var uName = document.getElementById("reg-username").value;
    var email = document.getElementById("reg-email").value;
    var pass = document.getElementById("reg-password").value;

    var userObj = {
      UserName: uName,
      Email: email,
      Password: pass,
    };

    // 2. שליחה לשרת
    registerUser(userObj)
      .then(function (res) {
        // 3. בדיקת התשובה מהשרת
        if (res.ok) {
          // --- הצלחה (Status 200) ---
          alert("Registration successful! Please log in now.");
          
          // ניקוי הטופס כדי שיהיה נקי
          registerForm.reset(); 
          
          // אופציונלי: להעביר את המוקד לשדה האימייל של הלוגין
          document.getElementById("login-email").focus();
        } 
        else if (res.status === 409) {
          // --- כישלון: אימייל קיים (Status 409) ---
          alert("Registration failed: This email is already registered.");
        } 
        else {
          // --- שגיאה אחרת ---
          alert("An error occurred. Status: " + res.status);
        }
      })
      .catch(function (err) {
        console.error(err);
        alert("Communication error with the server.");
      });
  });
}

// ============================================================
// טיפול בהתחברות (Login)
// ============================================================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // מניעת רענון הדף

    // 1. איסוף הנתונים
    var email = document.getElementById("login-email").value;
    var pass = document.getElementById("login-password").value;

    var loginData = {
      Email: email,
      Password: pass,
    };

    // 2. שליחה לשרת
    loginUser(loginData)
      .then(function (res) {
        // אם השרת החזיר תשובה תקינה (200)
        if (res.ok) {
          return res.json(); // מפענחים את נתוני המשתמש
        } 
        // אם השרת החזיר שגיאת הרשאה (401)
        else if (res.status === 401) {
          throw new Error("Wrong email or password"); // זורקים שגיאה ל-catch
        } 
        // שגיאות אחרות
        else {
          throw new Error("Login failed. Status: " + res.status);
        }
      })
      .then(function (user) {
        // --- הצלחה: קיבלנו את המשתמש ---
        console.log("Logged in user:", user);

        // שמירה ב-LocalStorage
        localStorage.setItem("activeUser", JSON.stringify(user));

        // הודעה למשתמש ומעבר דף
        alert("Welcome back, " + user.userName + "!");
        window.location.href = "index.html";
      })
      .catch(function (err) {
        // --- טיפול בשגיאות ---
        console.error(err);
        
        // בדיקה האם זו השגיאה שיצרנו ידנית למעלה
        if (err.message === "Wrong email or password") {
            alert("Login Failed: Incorrect email or password.");
        } else {
            alert("Login Error: Something went wrong. Please try again.");
        }
      });
  });
}