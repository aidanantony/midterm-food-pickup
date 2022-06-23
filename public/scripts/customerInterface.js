/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(() => {
  renderFood(foods);
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


// const createTweetElement = function(tweet) {
//   const article = $(`<article><header><div class="header-user"><img src=${tweet.user.avatars}><h5 class="user">${tweet.user.name}</h5></div><div class="header-replyingTo">${tweet.user.handle}</div></header><p class="tweet-data">${safeHtml(tweet.content.text)}</p><footer class="tweet-container-footer"><div class="footer-time"><p>${timeago.format(tweet.created_at)}</p></div><div class="footer-icon"><i class="fa-solid fa-flag fa-xs"></i>
//   <i class="fa-solid fa-retweet fa-xs"></i><i class="fa-solid fa-heart fa-xs"></i></div></footer></article>`);
//   return $('.tweet-container').prepend(article);
// };

const renderFood = function(foodDatabase) {
  for (let food of foodDatabase) {
    createFoodItem(food);
  }
};
