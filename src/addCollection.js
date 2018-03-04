import $ from "jquery";
import {contentArea, applicationState} from "./my-keys"
import myFavourites from "./favourites-collection";
export default function addToCollection(event, result){
	event.preventDefault();
	applicationState.restaurautToBeAdded = result;
	myFavourites(event);
}