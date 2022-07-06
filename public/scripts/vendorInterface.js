$(document).ready(function () {

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

  /**
   *
   * @param {*} orderData order object containing order information
   * @returns order element
   */
  const createOrderElement = function (orderData) {
    console.log("Order data: ", orderData);
    const order = $(`
      <article class="order-container">
        <header data-id = "${orderData.ordernumber}" class="order-header">
          <p>Order Number: ${orderData.ordernumber}</p>
          <p>Status: ${orderData.orderstatus}</p>
          <p>Prep Time: ${orderData.preptime} minutes</p>
          <button class="preparedButton" data-id = "${orderData.ordernumber}">Prepared</button>
        </header>
      </article>
    `);

    return order;
  };

  /**
   * Loop through all orders and then create order element to display all orders on page.
   * @param {*} orders array of orders
   */
  const renderOrders = function (orders) {
    console.log("bchabk");
    // loops through orders
    orders.slice().reverse().forEach(orderData => {

      const $order = createOrderElement(orderData);

      $vendorInterface.append($order);
    });
    vendorViewsManager.show('allOrders');
  };

  /**
   * On click of prepared button, order status is updated in database and sms is send to customer.
   */
  $(document).on('click', '.preparedButton', function (event) {
    const currentOrder = receivedOrders.find(order => order.ordernumber === Number($(event.target).attr("data-id")));

    if (currentOrder.orderstatus === "Confirmed") {
      updateOrderStatus(currentOrder.ordernumber, currentOrder.phone)
        .then(function (orders) {
          console.log(orders);
          getAllOrders();
        })
        .catch(error => console.error(error));
    }
    event.stopPropagation();
  });

  /**
   * On click on order element we can go to order information page where we can see more details of a order.
   */
  $(document).on('click', '.order-header', function (event) {
    const currentOrder = receivedOrders.find(order => order.ordernumber === Number($(event.target).attr("data-id")));
    currentSelectedOrder = Number($(event.target).attr("data-id"));
    console.log("bhsback: ", currentSelectedOrder);

    orderInformation.getOrder(currentSelectedOrder, currentOrder);
    vendorViewsManager.show('listings');

  });

  /**
   * Get all orders from database and displays on a page.
   */
  function getAllOrders() {
    clearListings();
    getOrders()
      .then(function (orders) {
        console.log(orders);
        receivedOrders = orders;
        renderOrders(orders);
      })
      .catch(error => console.error(error));
  }

  window.vendorInterface.getAllOrders = getAllOrders;

  getAllOrders();

});
