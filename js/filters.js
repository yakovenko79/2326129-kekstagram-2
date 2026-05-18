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
let pictures = [];

const debouncePhoto = debounce(createThumbnails);

function onFilterChange(evt) {
  const targetButton = evt.target;
  if(!targetButton.matches('button')){
    return;
  }
  const currentActive = filters.querySelector(`.${ACTIVE_FILTER_BUTTON}`);
  if(currentActive === targetButton) {
    return;
  }
  currentActive.classList.remove(ACTIVE_FILTER_BUTTON);
  targetButton.classList.toggle(ACTIVE_FILTER_BUTTON);
  currentFilter = targetButton.getAttribute('id');
  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  switch (currentFilter) {
    case Filters.DEFAULT:
      filteredPictures = [...pictures];
      break;
    case Filters.RANDOM:
      filteredPictures = [...pictures].sort(() => Math.random() - 0.5).slice(0, MAX_PICTURES_AMOUNT);
      break;
    case Filters.DISCUSSED:
      filteredPictures = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredPictures = pictures;
      break;
  }
  debouncePhoto(filteredPictures);
}

function openFilters(picturesData) {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFilterChange);
  pictures = picturesData;
  applyFilter();
}

export { openFilters };
