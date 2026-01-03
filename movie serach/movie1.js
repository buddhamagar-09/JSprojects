const API_KEY = "15bbed36";

// Elements
const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("movie-input");

const loader = document.querySelector(".loader");
const error = document.getElementById("error");
const card = document.getElementById("movie-card");

const poster = document.getElementById("movie-poster");
const titleEl = document.getElementById("movie-title");
const yearEl = document.getElementById("movie-year");
const genreEl = document.getElementById("movie-genre");
const plotEl = document.getElementById("movie-plot");

// Utility functions for toggling visibility
function show(el) {
    el.classList.remove("hidden");
}
function hide(el) {
    el.classList.add("hidden");
}

// Reset UI before new search
function resetUI() {
    hide(card);
    hide(error);
    poster.src = "";
    titleEl.textContent = "";
    yearEl.textContent = "";
    genreEl.textContent = "";
    plotEl.textContent = "";
}

// Fetch movie data from OMDb API
async function movieSearch(movie) {
    resetUI();
    show(loader);

    try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movie)}&plot=full`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data);

        // Wait 1 second to simulate loader
        await new Promise(r => setTimeout(r, 1000));
        hide(loader);

        if (data.Response === "False") {
            error.textContent = data.Error || "Movie not found!";
            show(error);
            return;
        }

        // Populate movie card
        poster.src = data.Poster !== "N/A" ? data.Poster : "";
        titleEl.textContent = data.Title;
        yearEl.textContent = `Year: ${data.Year}`;
        genreEl.textContent = `Genre: ${data.Genre}`;
        plotEl.textContent = data.Plot;

        show(card);

    } catch (err) {
        hide(loader);
        console.error(err); 
        error.textContent = "Something went wrong!";
        show(error);
    }
}
// Event listeners
searchBtn.addEventListener("click", () => {
    const value = input.value.toLowerCase().trim();
    if (!value) {
        error.textContent = "Enter a valid movie name.";
        show(error);
        return;
    }
    movieSearch(value);
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
});
