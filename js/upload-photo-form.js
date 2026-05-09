import { isHashtagValid, error } from './hashtag-validator';
import { isEscapeKey } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.body;

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const resetPhotoEditorFormButton = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

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
  uploadFileControl.value = '';
  pristine.reset();

}

function initUploadModal() {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    resetPhotoEditorFormButton.addEventListener('click', onResetFormButton);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
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

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

hashtagInput.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', onFormSubmit);

export { initUploadModal };
