// When the burger menu icon is clicked.
function animateBurger(icon) {
    icon.classList.toggle("animate"); // Toggle the burger icon class for animation

    let burgerNav = document.getElementById("burgerNavigation"); // Get the secondary navigation using it's ID
    burgerNav.classList.toggle("show"); // Toggle it's class to display the menu

}

// Handle when menu is resized after the burger icon has been toggled.
function handleMenuResize() {
    let browserWidth = window.innerWidth; // Get browser width in pixels
    let burgerNav = document.getElementById("burgerNavigation"); 
    let burgerIcon = document.getElementsByClassName("burger-icon")[0];

    // If the browser has been resized to the point in which the burger icon is hidden.
    if (browserWidth > 800) {

        // If the burger menu is toggled (open), close it.
        if (burgerIcon.classList.contains("animate")) {
            burgerIcon.classList.toggle("animate");
            burgerNav.classList.toggle("show");
        }
    }
}