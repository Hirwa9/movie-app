// TMDB URL config
export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
}

// Fetch Movies API
export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint =
        query ?
            `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch new movies', response.statusText);
    }

    const data = await response.json();

    return data.results;
}

// Fetch movie details API
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch movies details', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }

}

// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzdmN2EyM2Y3ZDU0Mzc5MDBhNjJiYzJlZWRiM2MwOSIsIm5iZiI6MTc0MzQzMTgyMS4xNzQsInN1YiI6IjY3ZWFhODhkM2ZjYTkwZDJkZmY3MDZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yL1YptOXNCbTx-tHF6wGXcmfB-I6DySN5C7MisFylnM'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

// Fetch trending movies API
export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/movie/day?language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch daily trending movies', response.statusText);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch upcoming movies API
export const fetchUpcomingMovies = async () => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/upcoming/movie/day?language=en-US?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch daily upcoming movies', response.statusText);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.log(error);
        throw error;
    }
}