$(document).ready(function() {

  // const receivedOrders = [];
  // getOrders()
  // .then(function(orders) {
  //   console.log(orders);
  //   receivedOrders = orders;
  // })
  // .catch(error => console.error(error));

  // for (let order of receivedOrders) {

  // }


  const orders = [
    {
      orderNumber: 1,
      orderStatus: "Complete",
      prepTime: 30,
      name: "John",
      phone: 6462976492
    },
    {
      orderNumber: 2,
      orderStatus: "Complete",
      prepTime: 25,
      name: "Ryan",
      phone: 54368432
    },
    {
      orderNumber: 3,
      orderStatus: "Pending",
      prepTime: 30,
      name: "Peter",
      phone: 961473642
    },
    {
      orderNumber: 4,
      orderStatus: "Pending",
      prepTime: 35,
      name: "James",
      phone: 131284838
    },

  ];

  const $vendorInterface = $(`
  <section id="orders-container">

    </section>
  `);
  window.$vendorInterface = $vendorInterface;

  const createOrderElement = function(orderData) {
    const order = $(`
      <article class="order-container">
        <header data-id = "${orderData.orderNumber}" class="order-header">
          <p>${orderData.orderNumber}</p>
          <p>${orderData.orderStatus}</p>
          <p>${orderData.prepTime} minutes</p>
          <button class="preparedButton" data-id = "${orderData.orderNumber}">Prepared</button>
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
  // your function here
  //console.log("Button clicked: ", event.target.id);
  const currentOrder = orders.find(order => order.orderNumber === Number($(event.target).attr("data-id")));
  //console.log("Name: " + currentOrder.customer.name + " phone: " + currentOrder.customer.phone);
  const alertString = "Name: " + currentOrder.name + " phone: " + currentOrder.phone;
  alert(alertString);
  event.stopPropagation();
});

$(document).on('click', '.order-header', function (event) {
  // your function here
  currentSelectedOrder = Number($(event.target).attr("data-id"));
  // renderOrder()
   console.log("bhsback: ", currentSelectedOrder);
  // vendorViewsManager.show('orderDetail');

  orderInformation.getOrder(currentSelectedOrder);
  vendorViewsManager.show('listings');

});

  renderOrders(orders);

});
