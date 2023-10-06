export const ANIME_URL = `https://api.jikan.moe/v4/anime`;
export const PAGINATION = (page) =>
  `https://api.jikan.moe/v4/anime?page=${page}`;
export const SEARCH_URL = (searchInput) =>
  `https://api.jikan.moe/v4/anime?q=${searchInput}`;
