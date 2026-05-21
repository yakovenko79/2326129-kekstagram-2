import { createThumbnails } from './thumbnails';
import { debounce } from './utils';

const ACTIVE_FILTER_BUTTON = 'img-filters__button--active';
const MAX_PICTURES_AMOUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filters.DEFAULT;
const filters = document.querySelector('.img-filters');
let currentActive = filters.querySelector(`.${ACTIVE_FILTER_BUTTON}`);
let pictures = [];

let randomCache = [];

function getRandomPhotos() {
  if (randomCache.length === 0) {
    randomCache = [...pictures]
      .sort(() => Math.random() - 0.5)
      .slice(0, MAX_PICTURES_AMOUNT);
  }
  return randomCache;
}

const debounceApplyFilter = debounce(applyFilter);

function onFilterClick(evt) {
  const targetButton = evt.target;
  if (!targetButton.matches('.img-filters__button')) {
    return;
  }
  if (currentActive === targetButton) {
    return;
  }
  currentActive.classList.remove(ACTIVE_FILTER_BUTTON);
  currentActive = targetButton;
  targetButton.classList.add(ACTIVE_FILTER_BUTTON);
  currentFilter = targetButton.getAttribute('id');
  debounceApplyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  switch (currentFilter) {
    case Filters.DEFAULT:
      filteredPictures = [...pictures];
      randomCache = [];
      break;
    case Filters.RANDOM:
      filteredPictures = getRandomPhotos();
      break;
    case Filters.DISCUSSED:
      filteredPictures = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
      randomCache = [];
      break;
  }
  createThumbnails(filteredPictures);
}

function openFilters(picturesData) {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFilterClick);
  pictures = picturesData;
  randomCache = [];
  applyFilter();
}

export { openFilters };
