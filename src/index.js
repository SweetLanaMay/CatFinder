import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const selectElement = document.querySelector('#single');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-text');
const error = document.querySelector('.error');

initPage();
function initPage() {
  fetchBreeds()
    .then(data => {
      renderOptions(data);
    })
    .catch(
      error => console.log(error),
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    );
}

function renderOptions(data) {
  const markupBreeds = data
    .map(({ id, name }) => {
      return `<li><option value ='${id}'>${name}</option></li>`;
    })
    .join('');
  selectElement.insertAdjacentHTML('beforeend', markupBreeds);
  new SlimSelect({
    select: '#single',
  });
}

selectElement.addEventListener('change', () => {
  const selectedBreedId = selectElement.value;

  breedSelect.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchCatByBreed(selectedBreedId)
    .then(data => renderSelectedBreed(data))
    .catch(
      error => console.log(error),
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    )
    .finally(() => {
      loader.classList.add('hidden');
      breedSelect.classList.remove('hidden');
    });
});

const renderSelectedBreed = breed => {
  const markupSelectedBreed = `<img class="cat_image" 
  src ="${breed.url}"
  alt="${breed.breeds[0].name}"/>
  <h2 class="cat_breed_title">${breed.breeds[0].name}</h2>
  <p class="cat_description">${breed.breeds[0].description}</p>
  <p class="cat_temperament">Temperament: ${breed.breeds[0].temperament}</p>
  `;

  catInfo.innerHTML(markupSelectedBreed);
};
