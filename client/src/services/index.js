import axios from 'axios';

export const CallApi = async config => {
  const request = await axios
    .request({
      baseURL: 'https://www.themealdb.com/api/json/v1/1',
      ...config,
      url: config.url,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  return request;
};
