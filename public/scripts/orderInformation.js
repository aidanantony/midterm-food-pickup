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



  const createOrderElement = function(orderData) {
    const order = $(`
      <section class="order-container">
        <header>
          <p>${orderData.ordernumber}</p>
          <p>${orderData.orderstatus}</p>
          <p>${orderData.preptime} minutes</p>
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


  const renderOrder = function(order, items) {
    const $order = createOrderElement(order);
    const $orderItems = renderOrderItems(items);
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
  function getOrder(orderNumber, order) {
    console.log("In order information");
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
