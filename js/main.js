import { createThumbnails } from './thumbnails';
import { getPhotos } from './generate-data.js';
import { initUploadModal } from './upload-photo-form.js';

const photos = getPhotos();

createThumbnails(photos);
initUploadModal();
