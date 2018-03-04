import { contentArea, contentTitle, applicationState } from "./my-keys"
import { createCollection, addCollection, addToExistingCollection, editCollection, deleteCollection} from "./collectionActions"
import $ from "jquery";

export default function myFavourites(event) {
  event.preventDefault();
  contentTitle.html('Favourite Restaurants');
  contentArea.html('');
  $(`<div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>`).appendTo(contentArea);

  if (applicationState.userCollection[0]) {
    let row = $('<div>', { 'class': 'row' }).appendTo(contentArea);
    let column = $('<div>', { 'class': 'col m12' }).appendTo(row);
    let panel = $('<div>', { 'class': 'card-panel' }).appendTo(column);

    // Setting the page header
    if (applicationState.restaurautToBeAdded) {
      $('<h3>', { html: 'Select collection' }).appendTo(panel);
    } else {
      $('<h3>', { html: 'My Favourites' }).appendTo(panel);
    }
    // Displaying the collection list
    let collectionList = $('<ul>', { 'class': 'collection' }).appendTo(panel);
    applicationState.userCollection.forEach(collection => {
      let collectionData = $('<li>', { 'class': 'collection-item', html: collection.collectionName }).appendTo(collectionList);
      // Displaying the action list for the collection
      let actions = $('<span>', { 'class': 'right' }).appendTo(collectionData);

      let edit = $('<a>', { href : '#modal1'}).appendTo(actions);
      edit.css('text-decoration', none);
      $('<i>', { 'class': 'material-icons', html: 'edit' }).appendTo(edit);

      // edit.bind('click', () => {
      //   editCollection(collection.collectionName, applicationState.userCollection.indexOf(collection));
      //   myFavourites(event);
      // });

      let del = $('<i>', { 'class': 'material-icons', html: 'delete' }).appendTo(actions);
      del.css('cursor', 'pointer');
      del.bind('click', () => {
        deleteCollection(applicationState.userCollection.indexOf(collection));
        myFavourites(event);
      });

      // Displaying the restaurants inide the collections
      if (collection.restaurantList[0]) {
        let restaurants = $('<ul>', { 'class': 'collection' }).appendTo(collectionData);
        collection.restaurantList.forEach(restaurant => {
          let rest = $('<li>', { 'class': 'collection-item', html: restaurant.name }).appendTo(restaurants);
          let actionRes = $('<span>', { 'class': 'right' }).appendTo(rest);
          let delRes = $('<i>', { 'class': 'material-icons', html: 'delete' }).appendTo(actionRes);
          delRes.css('cursor', 'pointer');
          delRes.bind('click', () => {
            deleteRestaurant(collection.collectionName, restaurant.name);
            myFavourites(event);
          });
        });

      }
      collectionData.bind('click', () => {
        if (applicationState.restaurautToBeAdded) {
          addToExistingCollection(event, collection);
          myFavourites(event);
        }
      });
    });
    createCollection();
  } else {
    createCollection();
  }
}



