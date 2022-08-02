/* eslint-disable no-undef */
$(function () {
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

  const singleIncomingOrder = (order) => {
    return `
  <div class="owner-dash-grid-row">
    <div class="order-num-header">
      ${order.id}
    </div>
    <div class="request-text">
      ${order.request}
    </div>
    <div class="items-list">
      ${order.items.map(item => {
    return `
      <div class="single-item">
        <div class="quality">
          <span>
          ${item.quantity}
          </span>
        </div>
        <div class="item-name">
          <span>
          ${item.name}
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
        ${order.createdAt}
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

  console.log('this shit ran');


  $('.owner-dashboard-container')
    .append(ownerHeader('John'))
    .append(pendingOrderHeader())
    .append(singleIncomingOrder({
      id: 1,
      request: 'I want to eat a lot of pizza',
      items: [{
        name: 'Pizza',
        quantity: 2,
      }],
      createdAt: '12:00'
    }));



});