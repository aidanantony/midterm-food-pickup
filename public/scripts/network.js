
function getOrders() {
  console.log("Get orders");
  return $.ajax({
    url: "/api/vendors/orders",
  });

}

function getItemsForCurrentOrder(id) {
  console.log("Get ItemsInfo");
  return $.ajax({
    url: `/api/vendors/order/items/${id}`,
  });
}

function updatePrepTime(data, id) {
  return $.ajax({
    method: "POST",
    url: `/api/vendors/order/update/${id}`,
    data
  });
}

function updateOrderStatus(id) {
  return $.ajax({
    url: `/api/vendors/order/status/${id}`,
  });
}


