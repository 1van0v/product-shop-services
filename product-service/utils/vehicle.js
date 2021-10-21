const axios = require('axios');
const fs = require('fs');

const urlToId = (url) => url.split('/').slice(-2)[0];

const vehicleBaseUrl = 'https://swapi.dev/api/vehicles/?page=4';
const imageBaseUrl = 'https://starwars-visualguide.com/assets/img/vehicles/';

const spaceVehicleToProduct = (vehicle) => {
  const id = urlToId(vehicle.url);

  return {
    count: vehicle.crew,
    title: vehicle.name,
    price: isNaN(vehicle.cost_in_credits) ? 1234567890 : vehicle.cost_in_credits,
    description: vehicle.model,
    image: imageBaseUrl + id + '.jpg'
  };
}

const getList = async () => {
  const columns = ['title', 'description', 'price', 'count', 'image'];
  let table = columns.join(',');
  const { data } = await axios.get(vehicleBaseUrl);
  const csvTable =  data.results.reduce((acc, i) => {
    acc += '\n';
    const product = spaceVehicleToProduct(i);
    return acc += columns.map(i => product[i]).join(',');
  }, table);

  console.log(csvTable);

  fs.writeFileSync('products.csv', csvTable);
}

getList();

