import { contentArea, contentTitle, applicationState } from "./my-keys"
import myFavourites from "./favourites-collection";
import $ from "jquery";

export function createCollection() {
  let row = $('<div>', { 'class': 'row' }).appendTo(contentArea);
  let column = $('<div>', { 'class': 'col m12' }).appendTo(row);
  let panel = $('<div>', { 'class': 'card-panel' }).appendTo(column);
  $('<h2>', { html: 'Create new collection' }).appendTo(panel);
  $('<input>', { id: 'collectionName', placeholder: 'Enter a name for your Collection' }).appendTo(panel);
  let createColl = $('<button>', { 'class': 'waves-red', html: 'Create' }).appendTo(panel);
  createColl.bind('click', () => {
    addCollection($('#collectionName').val());
    myFavourites(event);
  });
}

export function addCollection(collectionName) {
  let collectionDetails = {};
  collectionDetails['collectionName'] = collectionName;
  collectionDetails['restaurantList'] = [];
  if (applicationState.restaurautToBeAdded) {
    collectionDetails['restaurantList'].push(applicationState.restaurautToBeAdded);
    applicationState.restaurautToBeAdded = null;
  }
  applicationState.userCollection.push(collectionDetails);
}

export function addToExistingCollection(event, collection) {
  event.preventDefault();
  applicationState.userCollection.forEach(element => {
    if (element.collectionName === collection.collectionName) {
      element.restaurantList.push(applicationState.restaurautToBeAdded);
      applicationState.restaurautToBeAdded = null;
    }
  });
}

export function editCollection(collName) {
  ('You clicked edit ' + collName);


}

export function deleteCollection(index) {
  let conf = confirm('Do you wanna delete your collection?');
  if (conf) {
    // applicationState.userCollection.forEach(element => {
      // if (element.collectionName === collName) {
        applicationState.userCollection.splice(index, 1);
      // }
    // });
  }

}

export function deleteRestaurant(collName, resName) {
  applicationState.userCollection.forEach(element => {
    if (element.collectionName === collName) {
      element.restaurantList.forEach(data => {
        if (data.name === resName) {
          element.restaurantList.splice(element.restaurantList.indexOf(data), 1);
        }
      });
    }
  });
}
