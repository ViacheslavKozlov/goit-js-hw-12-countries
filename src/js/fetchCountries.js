const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/${searchQuery}`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Not found');
            }
            return response.json();
        })
}

export default fetchCountries;
