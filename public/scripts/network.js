
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

function updatePrepTime(data, id, phone) {
  return $.ajax({
    method: "POST",
    url: `/api/vendors/order/update/${id}/${phone}`,
    data
  });
}

function updateOrderStatus(id, phone) {
  return $.ajax({
    url: `/api/vendors/order/status/${id}/${phone}`,
  });
}


