$(document).ready(function() {

  const orders = [
    {
      orderNumber: 1,
      orderStatus: "Complete",
      prepTime: 30
    },
    {
      orderNumber: 2,
      orderStatus: "Complete",
      prepTime: 25
    },
    {
      orderNumber: 3,
      orderStatus: "Pending",
      prepTime: 30
    },
    {
      orderNumber: 4,
      orderStatus: "Pending",
      prepTime: 35
    },

  ];


  const createOrderElement = function(orderData) {
    const tweet = `
      <article class="order-container">
      <p>${orderData.orderNumber}</p>
      <p>${orderData.orderStatus}</p>
      <p>${orderData.prepTime} minutes</p>
      <button id="orderPrepared">Prepared</button>
      </article>
    `;

    return tweet;
  };

  const renderOrders = function(orders) {
    console.log("bchabk");
    // loops through tweets
    orders.slice().reverse().forEach(orderData => {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $order = createOrderElement(orderData);
      console.log($order);
      $("#orders-container").append($order);
    });
  };

  renderOrders(orders);

});
