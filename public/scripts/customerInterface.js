/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const orderCounter = function () {
  $('.checkout span').text($('.customer_cart > *').length); //counting direct child nodes

};

const createOrderItem = function(foodName, foodId, foodUrl) {
  const order_item = $(`
  <div class = "order_item">
    <div class = "order_details">
    <input name= "food" value = "${foodId}" type = "hidden"/>
      <img src = "${foodUrl}"/>
      <p>${foodName}</p>
    </div>
    <button class="remove_food_item" value = "">Remove</button>
  </div>`);
  return $('.customer_cart').prepend(order_item);
};

$(() => {
  $(document).on('click', '.add_food_item', function(event) {
    createOrderItem($(event.target).val(), $(event.target).attr("data-id"), $(event.target).attr("data-url")); //taking in food
    orderCounter();
  });

  $(document).on('click', '.remove_food_item', function() {
    $(this).parent().remove();
    orderCounter();
  });

});



