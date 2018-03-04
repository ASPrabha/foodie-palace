import categoryList from './category-details';
import getCollectionController from './collection-details';
import searchDataController from './search-data';
import myFavourites from "./favourites-collection";
import { cityId, searchBtn, contentArea, contentTitle, API_KEY, searchQry, homeNav } from './my-keys';
import $ from "jquery";

$( document ).ready(() => {
  // event.preventDefault();
  getCollectionController(cityId, contentArea, API_KEY, contentTitle);
  return false;
});

$('#searchBtn').bind('click', () => {
  searchDataController(contentArea, API_KEY, searchQry);
  // return false;
});


homeNav.bind('click', () => {
  getCollectionController(event, cityId, contentArea, API_KEY, contentTitle);
  // return false;
});

$('#list-nav').bind('click', () => {
  myFavourites(event);
});
