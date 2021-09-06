import axios from 'axios';

import { urlToId } from './url-to-id.js';

const vehicleBaseUrl = 'https://swapi.dev/api/vehicles';
const imageBaseUrl = 'https://starwars-visualguide.com/assets/img/vehicles/';

const spaceVehicleToProduct = (vehicle) => {
  const id = urlToId(vehicle.url);

  return {
    id,
    count: vehicle.crew,
    title: vehicle.name,
    price: isNaN(vehicle.cost_in_credits) ? vehicle.max_atmosphering_speed * vehicle.length : vehicle.cost_in_credits,
    description: vehicle.model,
    image: imageBaseUrl + id + '.jpg'
  };
}

export const getList = async () => {
  const { data } = await axios.get(vehicleBaseUrl);
  return data.results.map(spaceVehicleToProduct);
}

export const getById = async (id) => {
  const { data } = await axios.get(`${vehicleBaseUrl}/${id}`);
  return spaceVehicleToProduct(data);
}