import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const selectElement = document.querySelector('#single');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-text');
const error = document.querySelector('.error');

function createBreedOption(breed) {
  const option = document.createElement('option');
  option.value = breed.id;
  option.textContent = breed.name;
  return option;
}

function renderOptions(breeds) {
  const options = breeds.map(createBreedOption);
  options.forEach(option => {
    breedSelect.appendChild(option);
  });

  new SlimSelect({
    select: '#single',
    settings: {
      placeholderText: 'Please, choose a breed',
    },
  });
}

selectElement.addEventListener('change', () => {
  const selectedBreedId = selectElement.value;

  breedSelect.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchCatByBreed(selectedBreedId)
    .then(breeds => renderSelectedBreed(breeds))
    .catch((error) =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    )
    .finally(() => {
      loader.classList.add('hidden');
      breedSelect.classList.remove('hidden');
    });
});

function renderSelectedBreed(breeds) {
  const markup = breeds
    .map(breed => {
      const { image, name, description, temperament } = breed;
      const imageUrl = image?.[0]?.url || '';

      return `<img class="cat_image" 
  src ="${imageUrl}"
  alt="${name}"/>
  <h2 class="cat_breed_title">${name}</h2>
  <p class="cat_description">${description}</p>
  <p class="cat_temperament">Temperament: ${temperament}</p>
  `;
    })
    .join('');

  catInfo.innerHTML = markup;
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showError() {
  error.classList.remove('hidden');
}

function hideError() {
  error.classList.add('hidden');
}

  selectElement.addEventListener('change', () => {
    const selectedBreedId = selectElement.value;
  
    showLoader();
    hideError();
    fetchCatByBreed(selectedBreedId)
      .then(renderSelectedBreed)
      .catch(() => {
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  });

  document.addEventListener('DOMContentLoaded', () => {
    showLoader();
    hideError();
    fetchBreeds()
      .then(renderOptions)
      .catch(() => {
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  });