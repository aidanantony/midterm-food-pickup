$(document).ready(function() {
  //location.reload();
  // let order =
  // allOrders[currentSelectedOrder-1];

  //   console.log("Order Number: ", currentSelectedOrder);
  // let items= allOrders[currentSelectedOrder-1].items;

  const $orderInformation = $(`
    <section id="orders-container">

    </section>
  `);
  window.$orderInformation = $orderInformation;
  window.orderInformation = {};

  function clearListings() {
    $orderInformation.empty();
  }



  const createOrderElement = function(orderData) {
    const order = $(`
      <section class="order-container">
        <header>
          <p>${orderData.orderNumber}</p>
          <p>${orderData.orderStatus}</p>
          <p>${orderData.prepTime} minutes</p>
          <button class="backButton">Back</button>
        </header>
        <div class="orderItems"></div>
      </article>
    `);

    return order;
  };
  const createOrderItemElement = function(item) {
    const orderItem = `
      <div class="orderItem">
        <p>${item.name}</p>
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


  const renderOrder = function(order) {
    const $order = createOrderElement(order);
    const $orderItems = renderOrderItems(order.items);
    $order.append($orderItems);
    const $footer = createOrderFooter(order);
    $order.append($footer);
    console.log("bchabk");
    $orderInformation.append($order);

  };


  const createOrderFooter = function(order) {
    const $footer = $(`
      <footer>
        <p>${order.name}</p>
        <p>${order.phone}</p>
      </footer>
    `);

    return $footer;
  }

  $(document).on('click', '.backButton', function (event) {
    // your function here
    vendorViewsManager.show('allOrders');

  });

  //renderOrder(order);
  function getOrder(orderNumber) {
    console.log("In order information");
    clearListings();
    renderOrder(allOrders[orderNumber-1]);
    //$propertyListings.append(listing);
  }

  window.orderInformation.getOrder = getOrder;

});
