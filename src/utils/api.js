import { MMOBOMB_API_BASE_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getLatestNews = () => {
  return fetch(`${MMOBOMB_API_BASE_URL}/latestnews`)
    .then(checkResponse);
};

export const getGiveaways = () => {
  return fetch(`${MMOBOMB_API_BASE_URL}/giveaways`)
    .then(checkResponse);
};
