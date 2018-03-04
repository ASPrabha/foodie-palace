// import { cityId, contentArea, API_KEY, contentTitle } from './my-keys';
import $ from "jquery";


export default function getCollectionController(cityId, contentArea, API_KEY, contentTitle) {
  contentArea.html('');
  contentTitle.html('Collections');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('user-key', API_KEY);
  const initObject = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
  };

  fetch(`https://developers.zomato.com/api/v2.1/collections?city_id=${cityId}`, initObject)
    .then(result => result.json())
    .then((result) => {
      // console.log(result.collections);
      const collArray = result.collections;
      zomatoCollectionView(collArray, contentArea);

    })
    .catch((err) => {
      console.log(err);
    });
}

function zomatoCollectionView(collArray, contentArea) {
  for (let i = 0; i < collArray.length;) {
    let row = $('<div>', { 'class': 'row' }).appendTo(contentArea);
    for (let j = 0; j < 3; j += 1) {
      if (collArray[i]) {
        let column = $('<div>', { 'class': 'col s12 m4' }).appendTo(row);
        let card = $('<div>', { 'class': 'card small' }).appendTo(column);
        let cardImage = $('<div>', { 'class': 'card-image' }).appendTo(card);
        let image = $('<img>', { src: collArray[i].collection.image_url, alt: collArray[i].collection.title, 'class': 'responsive-img', height: '200px' }).appendTo(cardImage);
        let cardContent = $('<div>', { 'class': 'card-content' }).appendTo(card);
        $('<span>', { 'class': 'card-title activator grey-text text-darken-4', html: collArray[i].collection.title }).appendTo(cardContent);
        $('<a>', { href: collArray[i].collection.url, html: 'More Details' }).appendTo(cardContent);
        i += 1;
      }
    }

    // contentArea.insertAdjacentHTML('beforeend', elementData);
  }
}
