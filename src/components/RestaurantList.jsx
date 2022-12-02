import React from 'react'
import Restaurant from './Restaurant.jsx'

const RestaurantList = ({ restaurants, selectedOptions, sortDirection }) => {

  switch (sortDirection) {

    case "Alphabetical Order":
      restaurants.sort((a, b) => { return a.TITLE.substring(a.TITLE.indexOf(":")+1).localeCompare(b.TITLE.substring(b.TITLE.indexOf(":")+1)); });
      break;

    default:
      restaurants.sort((a, b) => { return a.TITLE.substring(a.TITLE.indexOf(":")+1).localeCompare(b.TITLE.substring(b.TITLE.indexOf(":")+1)); });
      break;
  }

  restaurants = restaurants.filter(rest => !rest.TITLE.includes("General Info"));
  // console.log(filterCategories)

  function filterRestaurants(){
    console.log(selectedOptions)
    let filteredRestaurants = restaurants;
    if (selectedOptions["Dietary Restrictions"] != []){
      filteredRestaurants = filteredRestaurants.filter(rest => selectedOptions["Dietary Restrictions"].every(cat => rest.CATEGORY.includes(cat)));
    }
    if (selectedOptions["Group Size"] != null){
      filteredRestaurants = filteredRestaurants.filter(rest => rest.CAPACITY[0] >= selectedOptions["Group Size"])
    }
    if (selectedOptions["Price Level"] != null){
      console.log("the length is")
      console.log(selectedOptions["Price Level"].length)
      filteredRestaurants = filteredRestaurants.filter(rest => rest.PRICE[0].length <= selectedOptions["Price Level"].length)
    }
    return filteredRestaurants;
  }

  return (
    <ul className="cards">
      {Object.values(filterRestaurants()).map((rest) =>
          <Restaurant restaurant={rest} key={rest.ID} />)}
    </ul>
  )
}

export default RestaurantList;
