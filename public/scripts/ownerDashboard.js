/* eslint-disable prefer-template */
/* eslint-disable no-undef */

// !! do not change the following classes or ID
// - .menu-options-container
// - .previous-orders-container
// - .owner-dashboard-container
// - .owner-current-orders
// - .single-incoming-order-form
// - input name="etaTime"
// - input name="acceptOrDecline"
// anything with an ID


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
        <div class="pending-orders-rows-cols">
          <div class="grid-item-center">Order Number</div>
          <div class="customer-requests  grid-item-center">Special Requests</div>
          <div class="grid-item-center">
              <div >
                <span >Quantity</span>
              </div>
              <div class="items-list">
                <span>Item name</span>
              </div>
          </div>
          <div class="accept-decline grid-item-center">
            <label>Accept</label>
          </div>
          <div class="time-created grid-item-center">Time</div>
          <div class="pickup-time grid-item-center">Pickup time</div>
          <p>Confirm</p>
        </div>
        `;
};




// renders a single order
// contains the values for the order id, notes, quantity, item name
// accept/decline
// time order was created
// inputs for owner to set pickup time
// confirm button to submit form
// !! DO NOT DELETE single-incoming-order-form class
const singleIncomingOrder = (data, orderItems) => {
  return `
  <form class="pending-orders-rows-cols single-incoming-order-form" id="${data.order_id}">
    <div class="grid-item-center">
      ${data.order_id}
    </div>
    <div class="grid-item-center">
      ${data.order_notes || 'No special requests'}
    </div>
    <div class="items-list">
      ${orderItems.map(item => {
    return `
            <div class="quantity-itemName-container">
                <div>
                  1
                </div>
                <div>
                  ${item.item_name}
                </div>
            </div>
            `;
  })}
    </div>
    
    <div class="accept-decline">
      <label>accept</label>
      <input 
        name="acceptOrDecline" 
        type="radio" 
        value="accept" 
      >
      <label>Decline</label>
      <input 
        name="acceptOrDecline" 
        type="radio" 
        value="decline" 
      >
    </div>

    <div class="time-created center-text">
      <span>
        ${convertOrderTime(data.time_order_created)}
      </span>
    </div>
    <div center-text>
      <input 
      class="etaTime"
        name="etaTime"
        type="time" 
        placeholder="4:00pm"
      >
    </div>
    <div class="center-text">
      <button type="submit">
        Send
      </button>
    </div>
  </form>
    `;
};

// called when response[0].id === 3 from the /lookupAllLogins route
// currently only user with id of 3 is the owner
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
        .append(ownerHeader(owner.name)) // shows restaurant owners name
        .append(pendingOrderHeader()); // appends pending order container where individual orders append to

      // current orders show and and header
      $('.owner-current-orders')
        .show()
        .append(currentOrdersHeader()); // appends after all pending orders

      // for each order, render a row with class of single-incoming-order-form
      for (let i = 0; i < data.length; i++) {
        if (data[i].time_order_started === null) {
          // GET request for a single order to get all menu items in a single order
          $.ajax({
            url: `http://localhost:8080/getMenuItemsFromOrderId`,
            method: 'GET',
            data: {
              orderId: data[i].order_id,
            },
            success: (orderItems) => {
              $('.owner-dashboard-container').append(singleIncomingOrder(data[i], orderItems));
            }
          });
        }

        // if order has been confirmed and started
        if (data[i].time_order_started !== null || data[i].pickup_time !== null) {
          // GET request for a single order to get all menu items in a single order
          $.ajax({
            url: `http://localhost:8080/getMenuItemsFromOrderId`,
            method: 'GET',
            data: {
              orderId: data[i].order_id,
            },
            success: (orderItems) => {
              $('.owner-current-orders')
                .append(singleCurrentOrder(data[i], orderItems)); // individual current orders
            }
          });
        }
      }
    }
  });
};



////////////////////////////////////////////////////////////////////////////////
// !! current orders
////////////////////////////////////////////////////////////////////////////////
const currentOrdersHeader = () => {
  return `
        <div class="current-header">
          <h2>Current Orders</h2>
        </div>
        <div class="current-orders-first-row">
          <div class="grid-item-center">Order Number</div>
          <div class="grid-item-center customer-requests">Special Requests</div>
          <div class="grid-item-center">
              <div >
                <span >Quantity</span>
              </div>
              <div class="items-list">
                <span>Item name</span>
              </div>
          </div>
          <div class="grid-item-center pickup-time">Pickup time</div>
          <p>Send RFP</p>
        </div>
        `;
};

// !! DO NOT DELETE current-order-form class
const singleCurrentOrder = (data, orderItems) => {
  return `
  <form class="current-single-item-row current-order-form" id="${data.order_id}">
    <div class="grid-item-center">
      ${data.order_id}
    </div>
    <div class="grid-item-center">
      ${data.order_notes || 'No special requests'}
    </div>
    <div class="items-list">
      ${orderItems.map(item => {
    return `
            <div class="quantity-itemName-container">
              <div>
                  1
              </div>
              <div>
                <span class="items-list">
                  ${item.item_name}
                </span>
              </div>
            </div>
            `;
  })}
    </div>
    <span class="grid-item-center">
      ${data.pickup_time}
    </span>
    <div class="grid-item-center">
      <button type="submit">
        RFP
      </button>
    </div>
  </form>
    `;
};