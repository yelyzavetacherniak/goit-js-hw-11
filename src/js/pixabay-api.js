import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const myApiKey = '51482137-814db58508ed4552264af265d';

export function getImagesByQuery(query) {
  return axios(baseUrl, {
    params: {
      key: myApiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}
