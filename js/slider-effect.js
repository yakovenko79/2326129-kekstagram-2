import { uploadForm } from './upload-photo-form';

const EFFECTS = {
  none: { filter: () => '', range: { min: 0, max: 100 }, start: 100, step: 1, hidden: true },
  chrome: { filter: (v) => `grayscale(${v})`, range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { filter: (v) => `sepia(${v})`, range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { filter: (v) => `invert(${v}%)`, range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { filter: (v) => `blur(${v}px)`, range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { filter: (v) => `brightness(${v})`, range: { min: 1, max: 3 }, start: 3, step: 0.1 }
};

const imageUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imageUploadWrapper.querySelector('.effect-level__slider');
const sliderContainer = imageUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelInput = imageUploadWrapper.querySelector('.effect-level__value');
const uploadImagePreview = imageUploadWrapper.querySelector('.img-upload__preview img');

let currentEffect = 'none';

function updateSliderOptions(){
  const options = EFFECTS[currentEffect];
  slider.noUiSlider.updateOptions({
    range: options.range,
    start: options.start,
    step: options.step
  });
  sliderContainer.classList.toggle('hidden', Boolean(options.hidden));
}

function applyFilter(value) {
  const effect = EFFECTS[currentEffect];
  uploadImagePreview.style.filter = currentEffect === 'none' ? '' : effect.filter(value);
}

function resetFilter(){
  currentEffect = 'none';
  uploadImagePreview.style.filter = '';
  sliderContainer.classList.add('hidden');
  if(slider.noUiSlider){
    slider.noUiSlider.set(100);
    effectLevelInput.value = 100;
  }
}

function onEffectChange() {
  currentEffect = uploadForm['effect'].value;
  updateSliderOptions(currentEffect);
  if(currentEffect === 'none'){
    uploadImagePreview.style.filter = '';
    return;
  }
  const currentValue = slider.noUiSlider.get();
  applyFilter(currentValue);
}

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

slider.noUiSlider.on('update', (values) => {
  const numValue = parseFloat(values[0]);
  effectLevelInput.value = numValue;
  if(currentEffect !== 'none'){
    applyFilter(numValue);
  }
});

export { resetFilter, onEffectChange };
