import axios from 'axios'

export const baseURL = 'https://api.themoviedb.org/3'
export const baseImageURL = 'https://image.tmdb.org/t/p'
export const apiKey = 'aecb864894d95dda780a58128f14f926'

export const movie = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    dataType: 'jsonp',
    jsonpCallback: 'test',
    params: {
        'api_key': apiKey,
    }
});

export const image = axios.create({
    baseURL: baseImageURL,
    timeout: 1000,
    dataType: 'jsonp',
    jsonpCallback: 'test',
    params: {
        'api_key': apiKey,
    }
});
