// import { API_KEY } from './my-keys.js';

const categoryArea = document.getElementById('categoryMenu');

export default function categoryList(API_KEY) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('user-key', API_KEY);
  const initObject = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
  };

  fetch('https://developers.zomato.com/api/v2.1/categories', initObject)
    .then(result => result.json())
    .then((result) => {
    	const catArray = result.categories;
	    let elementData = '';
      for (let i = 0; i < catArray.length; i++) {
        elementData = `<li id='category_${catArray[i].categories.id}'>${catArray[i].categories.name}</li>`;
        categoryArea.insertAdjacentHTML('beforeend', elementData);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
