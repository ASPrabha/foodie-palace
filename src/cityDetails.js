import { API_KEY } from './my-keys.js';

const cityArea = document.getElementById('city');

export default function getCity() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('user-key', API_KEY);
  const initObject = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
  };

  fetch('https://developers.zomato.com/api/v2.1/cities', initObject)
    .then(result => result.json())
    .then((result) => {
      console.log(result);
      //  	let catArray = result.categories;
	  //   var elementData = "";
      // for (var i = 0; i < catArray.length; i++) {
      // 	elementData = `<li id='category_${catArray[i].categories.id}'>${catArray[i].categories.name}</li>`;
      // 	cityArea.insertAdjacentHTML('beforeend', elementData);
      // }
    })
    .catch((err) => {
      console.log(err);
    });
}
