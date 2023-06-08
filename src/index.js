import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const selectElement = document.querySelector('#single');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-text');
const error = document.querySelector('.error');

initPage()
function initPage() {
  fetchBreeds().then(data => {
    renderOptions(data)
  })
  .catch((error) => console.log(error),
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'))
}


function renderOptions(data) {
    const markupBreeds = data
      .map(({ id, name }) => {
        return `<li><option value ='${id}'>${name}</option></li>`;
      })
      .join('');
    selectElement.insertAdjacentHTML('beforeend', markupBreeds);
    new SlimSelect({
            select: '#single'
        });
  }


selectElement.addEventListener('change', () => {
  const selectedBreedId = selectElement.value;

  breedSelect.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchCatByBreed(selectedBreedId)
    .then(data => renderSelectedBreed(data))
    .catch((error) => 
    console.log(error),
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    )
    .finally(() => {
      loader.classList.add('hidden');
      breedSelect.classList.remove('hidden');
    });
});

function renderSelectedBreed(data) {
  const markupSelectedBreed = data[0]
    .map(({ image, name, description, temperament }) => {

      return `<img class="cat_image" 
  src ="${image.url}"
  alt="${name}"/>
  <h2 class="cat_breed_title">${name}</h2>
  <p class="cat_description">${description}</p>
  <p class="cat_temperament">Temperament: ${temperament}</p>
  `;
    })
    .join('');

  catInfo.innerHTML = markupSelectedBreed;
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