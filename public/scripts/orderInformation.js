$(document).ready(function () {

  const $orderInformation = $(`
    <section id="orders-container">

    </section>
  `);
  window.$orderInformation = $orderInformation;
  window.orderInformation = {};

  function clearListings() {
    $orderInformation.empty();
  }

  let currentOrder = 1;

  /**
   *
   * @param {*} orderData order object containing order information
   * @returns order element
   */
  const createOrderElement = function (orderData) {
    const order = $(`
      <section class="order-container">
        <header>
          <p>Order Number: ${orderData.ordernumber}</p>
          <p>Status: ${orderData.orderstatus}</p>
          <p>Prep Time: ${orderData.preptime} minutes</p>
          <button id="backButton">Back</button>
        </header>
        <div class="orderItemsHeading">
          <p>Item Name</p>
          <p>Quantity</p>
        </div>
      </article>
    `);

    return order;
  };

  /**
   *
   * @param {*} item food item object containing food item information
   * @returns item element
   */
  const createOrderItemElement = function (item) {
    const orderItem = `
      <div class="orderItem">
        <p>${item.itemname}</p>
        <p>${item.quantity}</p>
      </div>
    `;

    return orderItem;
  }

  /**
   * Loop through all items and display it in a body of order element.
   * @param {*} items array of food items
   * @returns items element
   */
  const renderOrderItems = function (items) {
    const $items = $(`
      <div class="orderItems"></div>
    `);
    for (let item of items) {
      const $item = createOrderItemElement(item);
      $items.append($item);
    }
    return $items;
  }

  /**
   * Create footer element of order that displays name and phone of customer
   * @param {*} order order object containing order information
   * @returns footer element of order
   */
  const createOrderFooter = function (order) {
    const $footer = $(`
      <footer>
        <p>${order.name}</p>
        <p>${order.phone}</p>
      </footer>
    `);

    return $footer;
  }

  /**
   *
   * @returns form element to input prep time.
   */
  const confirmOrderForm = function () {
    const confirmOrder = $(`
      <form id="confirmOrderForm" >
        <label>Time to prepare: </label>
        <input type="number" name="prepTime" placeholder="Prep Time">
        <input type="submit" value="Confirm">
      </form>
    `);

    return confirmOrder;
  }

  /**
   * Display order details on page.
   * @param {*} order order object containing order details
   * @param {*} items food items object containing food items details
   */
  const renderOrder = function (order, items) {
    currentOrder = order;
    const $order = createOrderElement(order);
    const $orderItems = renderOrderItems(items);
    $order.append($orderItems);
    const $footer = createOrderFooter(order);
    $order.append($footer);
    $orderInformation.append($order);
    const $confirmOrder = confirmOrderForm();
    if (order.orderstatus === "New Order") {
      $orderInformation.append($confirmOrder);
    }

  };

  /**
   * On pressing confirm button, it updates database and send sms to customer
   */
  $(document).on('submit', '#confirmOrderForm', function (event) {
    event.preventDefault();

    const data = $(this).serialize();

    updatePrepTime(data, currentOrder.ordernumber, currentOrder.phone)
      .then(order => {
        vendorInterface.getAllOrders();
        vendorViewsManager.show('allOrders');
      });
  });

  /**
   * Go back to main page
   */
  $(document).on('click', '#backButton', function (event) {
    vendorViewsManager.show('allOrders');

  });

  /**
   * Get order details
   * @param {*} orderNumber
   * @param {*} order
   */
  function getOrder(orderNumber, order) {
    currentOrderNumber = orderNumber;
    getItemsForCurrentOrder(orderNumber)
      .then(function (items) {
        clearListings();
        renderOrder(order, items);
      })
      .catch(error => console.error(error));
  }

  window.orderInformation.getOrder = getOrder;

});
