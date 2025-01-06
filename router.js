
// router.js

// Define routes and corresponding views
const routes = {
    "mainpage": "<h1>Welcome to the Main Page</h1>",
    "news": "<h1>Latest News</h1><p>This is the news page content.</p>",
    "gallery": "<h1>Gallery</h1><p>Check out our images here.</p>",
    "register": `
      <h1>Register</h1>
      <form id="registerForm" onsubmit="handleLogin(); return false;">
        <label for="username">Enter Username:</label>
        <input type="text" id="username" required />
        <button type="submit">Login</button>
      </form>
    `,
};

// Function to load content dynamically
function loadContent(route) {
    const contentDiv = document.getElementById("content");
    if (contentDiv) {
        contentDiv.innerHTML = routes[route] || "<h1>404 - Page Not Found</h1>";
    }
}

// Handle navigation bar active link highlighting
function updateActiveLink(route) {
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${route}`) {
            link.classList.add("active");
        }
    });
}

// Event listener for hash changes
window.addEventListener("hashchange", () => {
    const route = window.location.hash.substring(1); // Get the route without the '#'
    loadContent(route);
    updateActiveLink(route);
});

// Initial load
window.addEventListener("load", () => {
    const initialRoute = window.location.hash.substring(1) || "mainpage"; // Default to 'mainpage'
    loadContent(initialRoute);
    updateActiveLink(initialRoute);
});

// State management: Login functionality
function handleLogin() {
    const username = document.getElementById("username").value.trim();
    if (username) {
        localStorage.setItem("username", username); // Store username in localStorage
        alert(`Welcome, ${username}!`);
        window.location.hash = "mainpage"; // Redirect to mainpage after login
        loadContent("mainpage"); // Load mainpage content
        displayGreeting(); // Show greeting
    } else {
        alert("Please enter a valid username.");
    }
}

// Display personalized greeting on mainpage
function displayGreeting() {
    const username = localStorage.getItem("username");
    const contentDiv = document.getElementById("content");
    if (username && contentDiv && window.location.hash.substring(1) === "mainpage") {
        contentDiv.innerHTML = `<h1>Welcome, ${username}!</h1>`;
    }
}

// Check login state on page load
window.addEventListener("load", () => {
    const contentDiv = document.getElementById("content");
    if (!localStorage.getItem("username") && contentDiv) {
        window.location.hash = "register"; // Redirect to register page if not logged in
        loadContent("register");
    } else {
        displayGreeting();
    }
});
