/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  render(foods, createFoodItem);
  render(orders, createOrderItem);
});


const createFoodItem = function(food) {
  const food_item = $(`
  <div class = food_item>
    <img src = "${food.image_url}"></img>
    <div class = "food_item_details">
      <p>${food.name}</p>
      <button class="add_food_item" type="submit">Add</button>
    </div>
  </div>
  `);
  return $('.restaurant_food_items').prepend(food_item);
};

const createOrderItem = function(order) {
  const order_item = $(`
  <div class = "order_item">
    <div class = "order_details">
      <p>A Big Giant Lobster</p>
      <p>A Big Giant Lobster</p>
      <p>A Big Giant Lobster</p>
    </div>
    <button class="remove_food_item" type="submit">Remove</button>
  </div>`);
  return $('.customer_cart').prepend(order_item);
};


const render = function(dataObject, callback) {
  for (let object of dataObject) {
    callback(object);
  }
};


