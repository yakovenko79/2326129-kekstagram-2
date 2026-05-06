import { createThumbnails } from './thumbnails';
import { getPhotos } from './generate-data.js';

const photos = getPhotos();

createThumbnails(photos);


