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
            `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
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

// Fetch TV series API
export const fetchTvSeries = async ({ query }: { query: string }) => {
    const endpoint =
        query ?
            `${TMDB_CONFIG.BASE_URL}/search/tv?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
            : `${TMDB_CONFIG.BASE_URL}/discover/tv?include_null_first_air_dates=false&language=en-US&page=1&without_companies=marvel&sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch tv series', response.statusText);
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
            throw new Error('Failed to fetch movie details', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch movie details API
export const fetchTvSeriesDetails = async (tvId: string): Promise<TvSeriesDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${tvId}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch tv series details', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch movie credits (Cast,Crew ...)
export const fetchMovieCredits = async (movieId: string): Promise<MovieCredits> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits?language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch movie credits', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch movie credits (Cast,Crew ...)
export const fetchTvSeriesCredits = async (movieId: string): Promise<MovieCredits> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${movieId}/credits?language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch tv serie credits', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch cast details
export const fetchCastDetails = async (movieId: string): Promise<CastDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/person/${movieId}?language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch person details', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch cast movie credits
export const fetchCastMovieCredits = async (movieId: string): Promise<CastMovieCredits> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/person/${movieId}/movie_credits?language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch person movie credits', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch movie's similars
export const fetchSimilarMovies = async (movieId: string): Promise<SimiralMovies> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch similar movies', response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch tv serie's similars
export const fetchSimilarTvSeries = async (movieId: string): Promise<SimiralMovies> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${movieId}/similar?language=en-US&page=1`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch similar tv series', response.statusText);
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
        // const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/movie/day`, {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/all/day?language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch daily trending movies and tv series', response.statusText);
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
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/upcoming?page=1'`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch upcoming movies', response.statusText);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch top rated movies API
export const fetchTopRatedMovies = async () => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/top_rated?language=en-US&page=1'`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch top rated movies', response.statusText);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.log(error);
        throw error;
    }
}