import * as apiRequest from './config/movieApiRequest';


export const getPopularMovies = async (page = 1) => {
    let data = await apiRequest.movie('/movie/popular', {
        params: {
            page
        }
    })
        .then(response => response.data)
        .catch(error => console.log(error))
    return data
}

export const getGenres = async () => {
    let data = await apiRequest.movie('/genre/movie/list')
        .then(response => response.data.genres)
        .catch(error => console.log(error))
    return data
}

export const getMovieImageURL = (imagePath, imageWidth) => {
    return `${apiRequest.baseImageURL}/w${imageWidth}${imagePath}?api_key=${apiRequest.apiKey}`
}

export const getMoviesFromSearch = async (queryString, year, page = 1) => {

    let data = await apiRequest.movie('/search/movie', {
        params: {
            page: page,
            query: queryString,
            year: year,
            includeAdult: false,
        }
    })
        .then(response => response.data)
        .catch(error => console.log(error))
    return data
}
