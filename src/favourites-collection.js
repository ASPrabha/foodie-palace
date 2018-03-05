import { contentArea, contentTitle, applicationState } from "./my-keys"
import { createCollection, addCollection, addToExistingCollection, editCollection, deleteCollection, deleteRestaurant } from "./collectionActions"
import $ from "jquery";
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';

export default function myFavourites(event) {
  event.preventDefault();
  contentTitle.html('Favourite Restaurants');
  contentArea.html('');

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
      let actions = $('<span>', { 'class' : 'right' }).appendTo(collectionData);
      let edit = $('<i>', { 'class': 'material-icons', html: 'edit' }).appendTo(actions);
      edit.css('cursor', 'pointer');
      edit.bind('click', () => {
        console.log('inside edit');
        collectionData.html('');
        let changeCollName = $('<div>', { 'class': 'row' });
        collectionData.html(changeCollName);
        let inputCol = $('<div>', { 'class': 'input-field col s6' }).appendTo(collectionData);
        let changeInput = $('<input>', { value: collection.collectionName, 'class': 'validate' }).appendTo(inputCol);
        let change = $('<i>', { 'class': 'material-icons', html: 'check' }).appendTo(inputCol);
        change.css('cursor', 'pointer');
        change.bind('click', () => {
          editCollection(changeInput.val(), applicationState.userCollection.indexOf(collection));
          myFavourites(event);
        });
        let noChange = $('<i>', { 'class': 'material-icons', html: 'clear' }).appendTo(inputCol);
        noChange.css('cursor', 'pointer');
        noChange.bind('click', () => {
          myFavourites(event);
        });
      });

      let del = $('<i>', { 'class': 'material-icons', html: 'delete' }).appendTo(actions);
      del.css('cursor', 'pointer');
      del.bind('click', () => {
        deleteCollection(applicationState.userCollection.indexOf(collection));
        myFavourites(event);
      });

      // Displaying the restaurants inide the collections
      if (collection.restaurantList[0]) {
        let restaurants = $('<ul>', { 'class': 'collection' }).appendTo(collectionData);
        restaurants.sortable(
        	);
        restaurants.disableSelection();
        collection.restaurantList.forEach(restaurant => {
          let rest = $('<li>', { 'class': 'collection-item ui-state-default', html: restaurant.name }).appendTo(restaurants);
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
