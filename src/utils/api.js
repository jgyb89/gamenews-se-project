import { MMOBOMB_API_BASE_URL } from "./constants";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getLatestNews = () => {
  return request(`${MMOBOMB_API_BASE_URL}/latestnews`);
};

export const getGiveaways = () => {
  return request(`${MMOBOMB_API_BASE_URL}/giveaways`);
};
