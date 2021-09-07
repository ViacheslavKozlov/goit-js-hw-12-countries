const BASE_URL = 'https://restcountries.eu/rest/v2';
const NAME_SEARCH_CRITERIA = 'name';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/${NAME_SEARCH_CRITERIA}/${searchQuery}`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Not found');
            }
            return response.json();
        })
}

export default fetchCountries;
