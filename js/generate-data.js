// import { getRandomElement, getRandomNumber } from './utils';

// const MESSAGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];

// const NAMES = [
//   'Барсик',
//   'Кекс',
//   'Мурзик',
//   'Борис',
//   'Муся',
//   'Глаша',
//   'Ириска',
//   'Мэл',
//   'Черныш',
//   'Маша',
//   'Рудольф'
// ];

// const PHOTO_AMOUNT = 25;

// const Likes = {
//   MIN: 15,
//   MAX: 200,
// };

// const Comments = {
//   MIN: 0,
//   MAX: 30
// };

// let commentId = 1;

// function getComment() {
//   const avatarId = getRandomNumber(1, 6);
//   return {
//     id: commentId++,
//     avatar: `img/avatar-${avatarId()}.svg`,
//     message: getRandomElement(MESSAGES),
//     name: getRandomElement(NAMES),
//   };
// }

// function getPhoto(index) {
//   let photoId = index + 1;
//   return {
//     id: photoId++,
//     url: `photos/${photoId - 1}.jpg`,
//     description: `${photoId - 1} photo`,
//     likes: Math.floor(Math.random() * (Likes.MAX - Likes.MIN + 1) + Likes.MIN),
//     comments: Array.from({length: Math.floor(Math.random() * (Comments.MAX - Comments.MIN + 1) + Comments.MIN)}, getComment)
//   };
// }

// export function getPhotos () {

//   return Array.from({length: PHOTO_AMOUNT}, (_, i) => getPhoto(i));
// }
