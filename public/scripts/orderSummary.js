const createSummary = function() {
  $.ajax({
    url: '/getNewestOrder',
    method: 'GET',
    dataType: 'json',
    success: (data) => {
    //  console.log('AHHH', data);
      let orderItem = '\n';
      let topHTML = `
      <div class='mainSummary'>
        <div class='summaryHeader'>
          <h1>Order Summary</h1>
        </div>
        <div class='orderinfo'>
          <div class='left'>
            <div class='restaurant'>
              <p>${data.out[0].restaurant}</p>
              <p>${data.out[0].phone_number}</p>
              <p>${data.out[0].street}, ${data.out[0].city}, ${data.out[0].province}, ${data.out[0].post_code}, ${data.out[0].country}</p>
            </div>
            <div class='total'>
              <p>$${addZeroes(data.out[0].order_total / 100)}</p>
            </div>
          </div>
          <div class='right'>
            <div class='order'>`

            for(let i = 0; i < data.out.length; i++) {
              orderItem += `
              <div>
                <h5>${data.out[i].food_name}</h5>
                <p>${data.out[i].description}</p>
                <p>$${addZeroes(data.out[i].price/100)}</p>
              </div>`;
            }



            let bottomHTML = `
            </div>
          </div>
        </div>
      </div>
      `;
      $('.main-container').append(topHTML + orderItem + bottomHTML);
    },
    error: (err) => {
      console.log(err);
    }
    });
};


const addZeroes = function (num) {
  return num.toFixed(2);
};

const getRestaurant = (id) => {
  $.get("/getRestaurantData", { id },
    function (data, status) {
    });
};




const createOrder = (arr, price) => {
  console.log('createOrder has run');
  price = Number(price.substring(1, price.length));
  $.post("/createOrder", { arr, price },
    function (data, status) {
      $('.main-container').children().remove();
      $('.header-welcome').remove();
      createSummary();
    });
};


$(function () {

  $(".menu-options-container").on("click", ".addToCart", function (event) {
    event.preventDefault();
    cartArr.push(Number(event['originalEvent']['path'][2]['id']));
    console.log('cartArr', cartArr);
    document.getElementsByClassName("cart-demo-btn")[0]['children'][1]['textContent']++;
  });


  $(".main-container").on("click", ".fa-trash-alt", function (event) {
    event.preventDefault();
    let subtotal = event.originalEvent.path[7].children[1].children[0].children[0].children[8].children[1].textContent;
    let total = event.originalEvent.path[7].children[1].children[0].children[0].children[9].children[1].textContent;
    subtotal = Number(subtotal.substring(1,subtotal.length));
    let itemId = Number(event.originalEvent.path[4].id.substring(9,event.originalEvent.path[4].id.length));
    let index = cartArr.indexOf(itemId);
    if (index > -1) {
      cartArr.splice(index,1);
    }
    let temp = event.originalEvent.path[2].children[1].children[0].textContent;
    let pricePerItem = (Number(temp.substring(1,temp.length)) / Number(event.originalEvent.path[4].children[0].children[1].children[0].children[0].textContent));
    let originalItemCount = (event.originalEvent.path[4].children[0].children[1].children[0].children[0].textContent);
    let newItemCount = originalItemCount - 1;
    subtotal -= pricePerItem;
    if ((originalItemCount) > 1) {
      event.originalEvent.path[4].children[0].children[1].children[0].children[0].textContent = newItemCount;
      event.originalEvent.path[2].children[1].children[0].textContent = `$${(addZeroes(newItemCount * pricePerItem))}`;

    } else {
      document.getElementById(event.originalEvent.path[4].id).remove();
    }
    event.originalEvent.path[7].children[1].children[0].children[0].children[8].children[1].textContent = `$${addZeroes(subtotal)}`;
    event.originalEvent.path[7].children[1].children[0].children[0].children[9].children[1].textContent = `$${addZeroes(subtotal * 1.12)}`;
    event.originalEvent.path[7].children[1].children[0].children[0].children[10].children[0].children[0].textContent = `$${addZeroes(subtotal * 1.12)}`;

    //originalEvent.path[4].children[0].children[1].children[0].children[0].textContent
    //originalEvent.path[2].children[1].children[0].textContent
  });

  $(".main-container").on("click", ".checkout", function (event) {
    event.preventDefault();
    createOrder(cartArr, event.currentTarget.children[0].children[0].textContent);
  });

})

