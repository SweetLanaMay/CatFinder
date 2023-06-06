fetchBreeds('https://api.thecatapi.com/v1/breeds?api_key=live_M9HZxBw55O4pnuOdTXAauSUY49IdT6kF4yZqQatXYnEOJMgzu0cNNFYk5VnQW1UJ')
.then(response => {
    return response.json();
})
.then(catBreeds => {
    console.log(catBreeds);
})
