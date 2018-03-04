import { contentArea, API_KEY } from './my-keys';
import $ from "jquery";
import addToCollection from './addCollection';

export default function viewRestaurantController(event, restId) {
  event.preventDefault();
  getSearchData()
}

function getRestaurantData(){
	const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('user-key', API_KEY);
  const initObject = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
  };

  let placeholder = 'http://via.placeholder.com/350x150';
  fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restId}`, initObject)
    .then(result => result.json())
    .then((result) => {
    	restaurantView(result)
    })
    .catch((err) => {
      console.log(err);
    });
}

function restaurantView(result) {
	let placeHolder = 'http://via.placeholder.com/350x150';
  contentArea.html('');
  contentTitle.html('');
  let jumbotron = $('<div>', { 'class': 'jumbotron' }).appendTo(contentArea);
  let resName = $('<h2>', { html: result.name }).appendTo(jumbotron);
  $('<img>', { src: (result.thumb) ? result.thumb : placeHolder, alt: result.name, 'class': 'thumbnail pull-left' }).appendTo(jumbotron);
  $('<address>', { html: result.location.address + ',<br>' + result.location.locality + ',<br>' + result.location.city }).appendTo(jumbotron);
  $('<p>', { html: 'Average Cost for two: ' + result.currency + ' ' + result.average_cost_for_two }).appendTo(jumbotron);
  $('<p>', { html: result.cuisines }).appendTo(jumbotron);
  let review = $('<p>', { html: result.user_rating.rating_text + ' ' }).appendTo(jumbotron);
  $('<span>', { 'class': 'badge', html: result.user_rating.aggregate_rating + '<br>' }).appendTo(review);
  $('<a>', { href: result.menu_url, 'class': 'btn btn-primary', html: 'View Menu' }).appendTo(jumbotron);

  let addtoCollection = $('<a>', { html: 'Add to favourites', 'class': 'btn btn-danger' }).appendTo(jumbotron);
  addtoCollection.bind('click', () => {
    addToCollection(event, result);
  });

}
