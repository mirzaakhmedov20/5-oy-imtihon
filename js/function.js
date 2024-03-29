function initializeDarkMode() {
    const darktheme = document.querySelector(".darkMode");
    const dark = document.querySelector(".dark");
    const moonImg = document.querySelector(".moonImg");

    // Retrieve the current mode from localStorage
    const savedMode = localStorage.getItem('darkMode');

    // Apply the saved mode if it exists
    if (savedMode) {
        document.body.classList.toggle('darkTheme', savedMode === 'dark');
        dark.innerHTML = savedMode === 'dark' ? 'Light Mode' : 'Dark Mode';
        moonImg.src = savedMode === 'dark' ? "../img/sun.png" : "../img/moon.png";
    }

    darktheme.addEventListener('click', function (e) {
        e.preventDefault();

        document.body.classList.toggle("darkTheme");

        const isDarkModeActive = document.body.classList.contains('darkTheme');
        localStorage.setItem('darkMode', isDarkModeActive ? 'dark' : 'light');

        // Update the button text and image source
        dark.innerHTML = isDarkModeActive ? 'Light Mode' : 'Dark Mode';
        moonImg.src = isDarkModeActive ? "../img/sun.png" : "../img/moon.png";
    });
}

export { initializeDarkMode,}