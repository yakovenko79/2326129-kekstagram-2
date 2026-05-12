import { isHashtagValid, error } from './hashtag-validator';
import { isEscapeKey } from './utils';
import { onEffectChange, resetFilter } from './slider-effect.js';

const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;


const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.body;

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const resetPhotoEditorFormButton = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const decreaseScaleButton = uploadForm.querySelector('.scale__control--smaller');
const increaseScaleButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const uploadImagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');

let currentScaleValue = parseInt(scaleValue.value.slice(0, -1), 10);

const scaleButtons = [
  { button: decreaseScaleButton, direction: -1 },
  { button: increaseScaleButton, direction: 1 }
];

function onResetFormButtonClick(){
  closePhotoEditorForm();
}

function onDocumentKeyDown(evt) {
  if(isEscapeKey(evt)){
    if(document.activeElement === hashtagInput || document.activeElement === commentInput){
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditorForm();
    }
  }
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

function closePhotoEditorForm(){
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  resetPhotoEditorFormButton.removeEventListener('click', onResetFormButtonClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  pristine.reset();
  uploadForm.reset();
  resetFilter();

}

function initUploadModal() {
  uploadFileControl.addEventListener('change', () => {
    resetFilter();
    currentScaleValue = MAX_SCALE;
    uploadImagePreview.style.transform = 'scale(1)';
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    resetPhotoEditorFormButton.addEventListener('click', onResetFormButtonClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
}

function onScaleImage(direction) {
  let newValue = currentScaleValue + STEP * direction;
  if(newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  } else if(newValue > MAX_SCALE){
    newValue = MAX_SCALE;
  }

  currentScaleValue = newValue;
  scaleValue.value = `${currentScaleValue}%`;
  uploadImagePreview.style.transform = `scale(${currentScaleValue / MAX_SCALE})`;
  decreaseScaleButton.disabled = (currentScaleValue === MIN_SCALE);
  increaseScaleButton.disabled = (currentScaleValue === MAX_SCALE);
}

function onHashtagInput() {
  isHashtagValid(hashtagInput.value);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if(pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
}

scaleButtons.forEach(({button, direction}) => {
  button.addEventListener('click', () => onScaleImage(direction));
});

pristine.addValidator(hashtagInput, isHashtagValid, error);

hashtagInput.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', onFormSubmit);

effectsList.addEventListener('change', onEffectChange);

export { initUploadModal, uploadForm };
