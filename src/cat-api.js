export function fetchBreeds() {
  const url =
    'https://api.thecatapi.com/v1/breeds?api_key=live_M9HZxBw55O4pnuOdTXAauSUY49IdT6kF4yZqQatXYnEOJMgzu0cNNFYk5VnQW1UJ';

  return fetch(url)
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_M9HZxBw55O4pnuOdTXAauSUY49IdT6kF4yZqQatXYnEOJMgzu0cNNFYk5VnQW1UJ`;

  return fetch(url)
  .then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  })
}

