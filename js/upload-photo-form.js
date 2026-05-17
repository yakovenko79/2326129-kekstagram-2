import { isHashtagValid, error } from './hashtag-validator';
import { isEscapeKey } from './utils';
import { onEffectChange, resetFilter } from './slider-effect.js';
import { ErrorText, sendData, showDataError } from './api.js';

const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

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
const submitButton = uploadForm.querySelector('.img-upload__submit');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

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

function onCloseNotification(evt){
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    pageBody.removeEventListener('click', onCloseNotification);
    pageBody.removeEventListener('keydown', onCloseNotification);
  }
}

function appendNotification(template) {
  const notificationNode = template.cloneNode(true);
  pageBody.append(notificationNode);
  pageBody.addEventListener('click', onCloseNotification);
  pageBody.addEventListener('keydown', onCloseNotification);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

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
  } else if (newValue > MAX_SCALE) {
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
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        appendNotification(templateSuccess);
        closePhotoEditorForm();
      })
      .catch(() => {
        showDataError(ErrorText.SEND_DATA);
        appendNotification(templateError);
      })
      .finally(unblockSubmitButton);
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
