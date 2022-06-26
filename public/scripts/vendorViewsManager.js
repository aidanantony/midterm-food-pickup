$(() => {

  const $main = $('#vendor-container');

  window.vendorViewsManager = {};
  window.vendorViewsManager.currentOrder = 1;

  window.vendorViewsManager.show = function(item) {
    $vendorInterface.detach();
    $orderInformation.detach();

    switch (item) {
      case 'allOrders':
        $vendorInterface.appendTo($main);
        break;
      case 'orderDetail':
        $orderInformation.appendTo($main);
        break;
      default: {
        $orderInformation.appendTo($main);
        break;
      }
    }
  }

});
