/* eslint-disable no-undef */
const ownerHeader = (name) => {
  return `
        <div class="owner-dash-header">
          <h1>Welcome back, ${name}</h1>
        </div>
    `;
};

const pendingOrderHeader = () => {
  return `
        <div class="owner-dash-grid-col-header">
          <h2>Pending Orders</h2>
        </div>
        <div class="owner-dash-grid-row">
          <div class="order-num-header">Order Number</div>
          <div class="customer-requests">Special Requests</div>
          <div class="items-list">
            <div class="single-item">
              <div class="quality">
                <span>Quantity</span>
              </div>
              <div class="item-name">
                <span>Item name</span>
              </div>
            </div>
          </div>
          <div class="accept-decline">
            <label>Accept</label>
          </div>
          <div class="time-created">Time</div>
          <div class="pickup-time">Pickup time</div>
          <div class="confirm-order">
            <p>Confirm</p>
          </div>
        </div>
        `;
};

const singleIncomingOrder = (data, orderItems) => {
  return `
  <div class="owner-dash-grid-row">
    <div class="order-num-header">
      ${data.order_id}
    </div>
    <div class="request-text">
      ${data.order_notes || 'No special requests'}
    </div>
    <div class="items-list">
      ${orderItems.map(item => {
    return `
      <div class="single-item">
        <div class="quality">
          <span>
            XX
          </span>
        </div>
        <div class="item-name">
          <span>
          ${item.item_name}
          </span>
        </div>
      </div>
      `;
  })}
    </div>
    <div class="accept-decline">
      <label>Accept</label>
      <input type="checkbox" name="accept" value="accept">
    </div>
    <div class="time-created">
      <span>
        ${data.time_order_created}
      </span>
    </div>
    <form class="confirm-order-time">
      <div>
        <input type="number" class="pickup-time">
        </input>
      </div>
      <div class="confirm-order">
        <button type=submit>Send</button>
      </div>
    </form>
  </div>
    `;
};

const renderOwnerDashboard = (owner) => {

  $.ajax({
    url: `http://localhost:8080/getRestaurantOrders`,
    method: 'GET',
    success: (data) => {
      $('.menu-options-container').hide();
      $('.previous-orders-container').hide();
      $('.login-container').hide();
      $('.owner-dashboard-container')
        .show()
        .append(ownerHeader(owner.name));
      // for each order, render a row
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        $.ajax({
          url: `http://localhost:8080/getMenuItemsFromOrderId`,
          method: 'GET',
          data: {
            orderId: data[i].order_id,
          },
          success: (orderItems) => {
            console.log("order items: ", orderItems);
            $('.owner-dashboard-container').append(singleIncomingOrder(data[i], orderItems));
          }
        });
      }
    }
  });
  




  // $('.owner-dashboard-container')
  //   .show()
  //   .append(ownerHeader(owner.name))
  //   .append(pendingOrderHeader())
  //   .append(singleIncomingOrder({
  //     id: 1,
  //     request: 'I want to eat a lot of pizza',
  //     items: [{
  //       name: 'Pizza',
  //       quantity: 2,
  //     }],
  //     createdAt: '12:00'
  //   }));
};
