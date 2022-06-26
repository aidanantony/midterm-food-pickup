let currentSelectedOrder = 1;

function getOrders() {
  console.log("Get orders");
  return $.ajax({
    url: "/api/vendors/orders",
  });

  // console.log("cdcdssx:", orders);
  // const updatedOrders = [];
  // for (let order in orders) {
  //   console.log(order);
  //   console.log(order.order.orderNumber);
  //   order["user"] = getUserInfoForCurrentOrder(order.orderNumber),
  //   order["items"] = getItemsForCurrentOrder(order.orderNumber)
  //   updatedOrders.push[order];
  // }
  //return orders;
}

function getUserInfoForCurrentOrder(id) {
  console.log("Get UserInfo");
  return $.ajax({
    url: `/api/vendors/order/user/:${id}`,
  });
}

function getItemsForCurrentOrder(id) {
  console.log("Get ItemsInfo");
  return $.ajax({
    url: `/api/vendors/order/items/:${id}`,
  });
}

function currentOrder(order) {
  return order;
}

const allOrders = [
  {
    orderNumber: 1,
    orderStatus: "Complete",
    prepTime: 30,
    name: "John",
    phone: 6462976492,
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
    ]

  },
  {
    orderNumber: 2,
    orderStatus: "Complete",
    prepTime: 25,
    name: "Ryan",
    phone: 54368432,
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
    ]

  },
  {
    orderNumber: 3,
    orderStatus: "Pending",
    prepTime: 30,
    name: "Peter",
    phone: 961473642,
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
  },
  {
    orderNumber: 4,
    orderStatus: "Pending",
    prepTime: 35,
    name: "James",
    phone: 131284838,
    items: [
      {
        name: "Item1",
        quantity: 2
      }
    ],

  },

];

