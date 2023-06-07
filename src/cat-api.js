export function fetchBreeds() {
  const url =
    'https://api.thecatapi.com/v1/breeds?api_key=live_M9HZxBw55O4pnuOdTXAauSUY49IdT6kF4yZqQatXYnEOJMgzu0cNNFYk5VnQW1UJ';

  return fetch(url)
    .then(response => response.json())
    .then(breeds => {
      console.log(breeds);
      return breeds;
    })
    .catch(error => console.log(error));
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => response.json())
    .then(breed => {
        console.log(breed)
      return breed;
    })
    .catch(error => console.log(error));
}
