import { isHashtagValid, error } from './hashtag-validator';
import { isEscapeKey } from './utils';

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
const uploadImagePreview = uploadForm.querySelector('.img-upload__preview');

let currentScaleValue = parseInt(scaleValue.value.slice(0, -1), 10);
const scaleButtons = [
  { button: decreaseScaleButton, direction: -1 },
  { button: increaseScaleButton, direction: 1 }
];

function onResetFormButton(){
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
  resetPhotoEditorFormButton.removeEventListener('click', onResetFormButton);
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onScaleImage);
  uploadFileControl.value = '';
  pristine.reset();

}

function initUploadModal() {
  uploadFileControl.addEventListener('change', () => {
    currentScaleValue = 100;
    scaleValue.value = '100%';
    uploadImagePreview.style.transform = 'scale(1)';
    decreaseScaleButton.disabled = false;
    increaseScaleButton.disabled = true;
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    resetPhotoEditorFormButton.addEventListener('click', onResetFormButton);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
}

function onScaleImage(direction) {
  const step = 25;
  let newValue = currentScaleValue += step * direction;
  if(newValue < 25) {
    newValue = 25;
  }
  if(newValue > 100){
    newValue = 100;
  }
  currentScaleValue = newValue;
  scaleValue.value = `${currentScaleValue}%`;
  uploadImagePreview.style.transform = `scale(${currentScaleValue / 100})`;
  decreaseScaleButton.disabled = (currentScaleValue === 25);
  increaseScaleButton.disabled = (currentScaleValue === 100);
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

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

hashtagInput.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', onFormSubmit);

export { initUploadModal };
