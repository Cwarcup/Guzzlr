/* eslint-disable prefer-template */
/* eslint-disable no-undef */

// displays admin ame on  under navbar
const ownerHeader = (name) => {
  return `
        <div class="owner-dash-header">
          <h1>Welcome back, ${name}</h1>
        </div>
    `;
};

// creates a grid of 7 columns with each column representing a field of the order (order id, notes, quantity...)
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

// renders a single order
// contains the values for the order id, notes, quantity, item name
// accept/decline
// time order was created
// inputs for owner to set pickup time
// confirm button to submit form
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
      <input type="checkbox" name="accept" value="accept"       id="accept-${data.order_id}">
      <label>Decline</label>
      <input type="checkbox" name="decline" value="decline" id="decline-${data.order_id}">
    </div>
    <div class="time-created">
      <span>
        ${getHumanDate(data.time_order_created)}
      </span>
    </div>
    <form class="confirm-order-time">
      <div>
        <input type="text" class="eta-time" id="submit-forms-${data.order_id}" placeholder="4:00pm">
      </div>
    </form>
    <div class="confirm-order">
      <button form="confirm-${data.order_id}" id="submit-forms" class="submit-${data.order_id}">Send</button>
    </div>
  </div>
    `;
};

// !! can get the id for the form time via the form id value (confirm-${data.order_id})

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
        .append(ownerHeader(owner.name))
        .append(pendingOrderHeader());

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
};

// runs when confirmation button is clicked on admin dashboard
const submitForms = () => {
  console.log("submit confirmation forms has run");

  const time = $('input[class="eta-time"]').val();


  const confirmOrder = $('input[name="accept"]:checked').val() || $('input[name="decline"]:checked').val();
  console.log("ordertime: ", time);
  console.log("confirmOrder : ", confirmOrder);


};