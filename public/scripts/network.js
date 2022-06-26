
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


