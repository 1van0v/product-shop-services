// extract id from "url": "https://swapi.dev/api/vehicles/4/"
export const urlToId = (url) => url.split('/').slice(-2)[0];