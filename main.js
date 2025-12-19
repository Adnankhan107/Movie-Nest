console.log("Movie app connected");

const API_KEY = "14f391d1846ca7fb2fff6b9eca33472d";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

async function fetchMovies(endpoint) {
    try{
         const url = endpoint.includes("?")
            ? `${API_BASE_URL}${endpoint}&api_key=${API_KEY}`
            : `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`;

        const response = await fetch(url, {
            headers: {
                Accept: "application/json"
            }
        });
        const data = await response.json();

        const movieGrid = document.querySelector(".movie-grid");

        movieGrid.innerHTML = "";

        data.results.forEach(movie => {

        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";

        const movieImg = document.createElement("img");
        movieImg.className = "movie-poster";
        movieImg.src = API_IMAGE_URL + movie.poster_path
        ? API_IMAGE_URL + movie.poster_path
        : "";
        
        const movieTitle = document.createElement("div");
        movieTitle.className = "movie-title";
        movieTitle.textContent = movie.title;

        const movieInfo = document.createElement("div");
        movieInfo.className = "movie-info";

        const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "N/A";
        movieInfo.textContent = `${year} • ★ ${movie.vote_average} `


        movieItem.appendChild(movieImg);
        movieItem.appendChild(movieTitle);
        movieItem.appendChild(movieInfo);

        movieGrid.appendChild(movieItem);

        });



    }catch(error){
        console.log("Error fetching popular movies:", error);
    }
}

fetchMovies("/movie/popular");

const movieTabs = document.querySelectorAll(".tab");

movieTabs.forEach(movieTab => {
    movieTab.addEventListener("click", () => {
        

        movieTabs.forEach(tab => {
            tab.classList.remove("active");
        });

        movieTab.classList.add("active");



        let endpoint = "";

        if(movieTab.textContent === "Popular"){
            endpoint = "/movie/popular";
        }else if(movieTab.textContent === "Top Rated"){
            endpoint = "/movie/top_rated";
        }else if(movieTab.textContent === "Upcoming"){
            endpoint = "/movie/upcoming";
        }else if(movieTab.textContent === "Now Playing"){
            endpoint = "/movie/now_playing";
        }
        
        fetchMovies(endpoint);
    });
});

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    if(query === ""){
        fetchMovies("/movie/popular");
        return;
    }

    const searchEndpoint = `/search/movie?query=${encodeURIComponent(query)}`;
    fetchMovies(searchEndpoint);
});