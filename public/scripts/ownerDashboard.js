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
  <form class="owner-dash-grid-row single-incoming-order-form" id="${data.order_id}">

    <div 
      class="order-num-header">
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
    <div class="time-created">
      <span>
        ${getHumanDate(data.time_order_created)}
      </span>
    </div>
      <div>
        <input 
          type="time" 
          placeholder="4:00pm"
          name="etaTime"
        >
      </div>
      <div class="confirm-order">
      <button type="submit">
        Send
      </button>
      </div>
      </form>

    `;
};



// !! can get the id for the form time via the form id value (confirm-${data.order_id})
// TODO: filter values
const renderOwnerDashboard = (owner) => {
  $.ajax({
    // get all orders using an id
    // hard coded ID = 1
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

      
      // for each order, render a row
      // takes in a single order using data from previous request
      // takes in array of order numbers
      // GET request for a single order
      // appends singleIncomingOrder if successful
      for (let i = 0; i < data.length; i++) {
        if (data[i].time_order_started === null) {
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
      }
    }
  });
};

// !! TODO: currently not working. Only works for first order.
// runs when confirmation button is clicked on admin dashboard
// each confirm button should have a unique id
// each input (accept/decline, order pikcup time) should have a unique id equal to the order numbe
// function runs in app.js
// const submitForms = () => {
//   console.log("submit confirmation forms has run");

//   // get the input from the time-pickup input
//   const time = $('input[class="eta-time"]').val();

//   // get the input from the accept/decline input
//   const confirmOrder = $('input[name="accept"]:checked').val() || $('input[name="decline"]:checked').val();
  
//   // log these in the browser
//   console.log("ordertime: ", time);
//   console.log("confirmOrder : ", confirmOrder);

// };
