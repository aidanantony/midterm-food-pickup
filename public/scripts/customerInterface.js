/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(() => {
  render(foods);
});


// const createFoodItem = function(food) {
//   const food_item = $(`<div class = food_item>
//   <img src = "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Ffoodsided.com%2Ffiles%2F2020%2F09%2FIMG_8637.jpg"></img><div class = "food_item_details"><p>A Big Giant Lobster</p><button class="add_food_item" type="submit">Add</button></div></div>
//   `);
//   return $('.restaurant_food_items').prepend(food_item);
// };


const createFoodItem = function(food) {
  const food_item = $(`<div class = food_item>
  <img src = "${food.image_url}"></img><div class = "food_item_details"><p>${food.name}</p><button class="add_food_item" type="submit">Add</button></div></div>
  `);
  return $('.restaurant_food_items').prepend(food_item);
};

// const createOrderItem = function() {
//   const order_item = $(`  <div class = "order_item">
//   <div class = "order_details"><img src = "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Ffoodsided.com%2Ffiles%2F2020%2F09%2FIMG_8637.jpg"></img><p>A Big Giant Lobster</p>
//   </div><button class="remove_food_item" type="submit">Remove</button></div>`);
//   return $('.customer_cart').prepend(order_item);
// };


const render = function(dataObject) {
  for (let object of dataObject) {
    createFoodItem(object);
  }
};
