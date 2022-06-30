$(document).ready(function() {

  const $orderInformation = $(`
    <section id="orders-container">

    </section>
  `);
  window.$orderInformation = $orderInformation;
  window.orderInformation = {};

  function clearListings() {
    $orderInformation.empty();
  }

  let currentOrder= 1;

  const createOrderElement = function(orderData) {
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
  const createOrderItemElement = function(item) {
    const orderItem = `
      <div class="orderItem">
        <p>${item.itemname}</p>
        <p>${item.quantity}</p>
      </div>
    `;

    return orderItem;
  }

  const renderOrderItems = function(items) {
    const $items = $(`
      <div class="orderItems"></div>
    `);
    for (let item of items) {
      const $item = createOrderItemElement(item);
      $items.append($item);
    }
    return $items;
  }

  const createOrderFooter = function(order) {
    const $footer = $(`
      <footer>
        <p>${order.name}</p>
        <p>${order.phone}</p>
      </footer>
    `);

    return $footer;
  }

  const confirmOrderForm = function() {
    const confirmOrder = $(`
      <form id="confirmOrderForm" >
        <label>Time to prepare: </label>
        <input type="number" name="prepTime" placeholder="Prep Time">
        <input type="submit" value="Confirm">
      </form>
    `);

    return confirmOrder;
  }


  const renderOrder = function(order, items) {
    currentOrder = order;
    const $order = createOrderElement(order);
    const $orderItems = renderOrderItems(items);
    $order.append($orderItems);
    const $footer = createOrderFooter(order);
    $order.append($footer);
    console.log("bchabk");
    $orderInformation.append($order);
    const $confirmOrder = confirmOrderForm();
    if (order.orderstatus === "New Order") {
      $orderInformation.append($confirmOrder);
    }

  };

  // $( "#confirmOrderForm" ).submit(function( event ) {
  //   console.log("Inside form");
  //   event.preventDefault();
  //   const data = $(this).serialize();
  //   alert( `Handler for .submit() called. ${data.prepTime}` );

  // });

  //$('#confirmOrderForm').submit(function(event){
  $(document).on('submit', '#confirmOrderForm', function (event) {
    event.preventDefault();
    console.log("Inside form");

    const data = $(this).serialize();

    updatePrepTime(data, currentOrder.ordernumber, currentOrder.phone)
      .then(order => {
        console.log(order);
        vendorInterface.getAllOrders();
        vendorViewsManager.show('allOrders');
      });
  });


  $(document).on('click', '#backButton', function (event) {
    // your function here
    console.log("Inside back button function");
    vendorViewsManager.show('allOrders');

  });

  // $( "#backButton" ).on( "click", function() {
  //   console.log("Inside back button function");
  //   vendorViewsManager.show('allOrders');
  // });

  //renderOrder(order);
  function getOrder(orderNumber, order) {
    console.log("In order information");
    currentOrderNumber = orderNumber;
    getItemsForCurrentOrder(orderNumber)
    .then(function(items) {
      console.log(items);
      clearListings();
      renderOrder(order, items);
    })
    .catch(error => console.error(error));

    //$propertyListings.append(listing);
  }

  window.orderInformation.getOrder = getOrder;

});
