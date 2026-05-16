import { createThumbnails } from './thumbnails';
import { initUploadModal } from './upload-photo-form.js';
import { ErrorText, getData, showDataError } from './api.js';

async function init() {
  try {
    const data = await getData();
    createThumbnails(data);
  } catch (error) {
    showDataError(ErrorText.GET_DATA);
  }
  initUploadModal();
}

init();
