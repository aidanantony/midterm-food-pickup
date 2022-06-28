$(document).ready(function() {

  // const receivedOrders = [];
  let receivedOrders = [];


  const $vendorInterface = $(`
  <section id="orders-container">

    </section>
  `);
  window.$vendorInterface = $vendorInterface;
  window.vendorInterface = {};

  function clearListings() {
    $vendorInterface.empty();
  }


  const createOrderElement = function(orderData) {
    console.log("Order data: ", orderData);
    const order = $(`
      <article class="order-container">
        <header data-id = "${orderData.ordernumber}" class="order-header">
          <p>${orderData.ordernumber}</p>
          <p>${orderData.orderstatus}</p>
          <p>${orderData.preptime} minutes</p>
          <button class="preparedButton" data-id = "${orderData.ordernumber}">Prepared</button>
        </header>
        <div class="orderItems"></div>
      </article>
    `);

    return order;
  };

  const renderOrders = function(orders) {
    console.log("bchabk");
    // loops through tweets
    orders.slice().reverse().forEach(orderData => {

      const $order = createOrderElement(orderData);

      $vendorInterface.append($order);
    });
    vendorViewsManager.show('allOrders');
  };


$(document).on('click', '.preparedButton', function (event) {
  const currentOrder = receivedOrders.find(order => order.ordernumber === Number($(event.target).attr("data-id")));
  const alertString = "Name: " + currentOrder.name + " phone: " + currentOrder.phone;
  // alert(alertString);
  updateOrderStatus(currentOrder.ordernumber)
  .then(function(orders) {
    console.log(orders);
    getAllOrders();
  })
  .catch(error => console.error(error));
  event.stopPropagation();
});

$(document).on('click', '.order-header', function (event) {
  // your function here
  const currentOrder = receivedOrders.find(order => order.ordernumber === Number($(event.target).attr("data-id")));
  currentSelectedOrder = Number($(event.target).attr("data-id"));
  // renderOrder()
   console.log("bhsback: ", currentSelectedOrder);
  // vendorViewsManager.show('orderDetail');

  orderInformation.getOrder(currentSelectedOrder, currentOrder);
  vendorViewsManager.show('listings');

});

function getAllOrders() {
  clearListings();
  getOrders()
  .then(function(orders) {
    console.log(orders);
    receivedOrders = orders;
    renderOrders(orders);
  })
  .catch(error => console.error(error));
}

window.vendorInterface.getAllOrders = getAllOrders;

getAllOrders();

});
