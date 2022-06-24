$(document).ready(function() {

  const orders = [
    {
      orderNumber: 1,
      orderStatus: "Complete",
      prepTime: 30,
      items: [
        {
          name: "Item1",
          quantity: 2
        },
        {
          name: "Item2",
          quantity: 2
        },
        {
          name: "Item3",
          quantity: 4
        }
      ],
      customer: {
        name: "John",
        phone: 6462976492
      }
    },
    {
      orderNumber: 2,
      orderStatus: "Complete",
      prepTime: 25,
      items: [
        {
          name: "Item1",
          quantity: 2
        },
        {
          name: "Item2",
          quantity: 2
        },
        {
          name: "Item3",
          quantity: 4
        },
        {
          name: "Item4",
          quantity: 3
        }
      ],
      customer: {
        name: "Ryan",
        phone: 54368432
      }
    },
    {
      orderNumber: 3,
      orderStatus: "Pending",
      prepTime: 30,
      items: [
        {
          name: "Item1",
          quantity: 2
        },
        {
          name: "Item2",
          quantity: 2
        }
      ],
      customer: {
        name: "Peter",
        phone: 961473642
      }
    },
    {
      orderNumber: 4,
      orderStatus: "Pending",
      prepTime: 35,
      items: [
        {
          name: "Item1",
          quantity: 2
        }
      ],
      customer: {
        name: "James",
        phone: 131284838
      }
    },

  ];


  const createOrderElement = function(orderData) {
    const order = $(`
      <article class="order-container">
        <header>
          <p>${orderData.orderNumber}</p>
          <p>${orderData.orderStatus}</p>
          <p>${orderData.prepTime} minutes</p>
          <button id="${orderData.orderNumber}" class="preparedButton">Prepared</button>
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
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $order = createOrderElement(orderData);
      const $orderItems = renderOrderItems(orderData.items);
      $order.append($orderItems);
      const $footer = createOrderFooter(orderData.customer);
      $order.append($footer);
      $("#orders-container").append($order);
    });
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

  const createOrderFooter = function(customer) {
    const $footer = $(`
      <footer>
        <p>${customer.name}</p>
        <p>${customer.phone}</p>
      </footer>
    `);

    return $footer;
  }

//   $(".preparedButton").on('click', function(event){
//     // event.stopPropagation();
//     // event.stopImmediatePropagation();
//     console.log("Button clicked: ", event);
// });

// $( ".preparedButton" ).click(function() {
//   console.log("Buttonnnnnn clicked: ");
// });

$(document).on('click', '.preparedButton', function (event) {
  // your function here
  console.log("Button clicked: ", event.target.id);
  const currentOrder = orders.find(order => order.orderNumber === Number(event.target.id));
  console.log("Name: " + currentOrder.customer.name + " phone: " + currentOrder.customer.phone);
  const alertString = "Name: " + currentOrder.customer.name + " phone: " + currentOrder.customer.phone;
  alert(alertString);

});

  renderOrders(orders);

});


module.exports = {
  createOrderFooter,
  renderOrderItems,
  createOrderItemElement,
  renderOrders,
  createOrderElement,
  orders
}
