const createSummary = function() {
  let summaryHTML = `
  <div>
    <p> THIS IS AN ORDER SUMMARY KEKW </p>
  </div>

  `;

  return summaryHTML;
};


const addZeroes = function (num) {
  return num.toFixed(2);
};

const createOrder = (arr, price) => {
  console.log('createOrder has run');
  price = Number(price.substring(1, price.length));
  $.post("/createOrder", { arr, price },
    function (data, status) {
      alert(`Data: ${  data  }\nStatus: ${  status}`);
    });
};


$(function () {

  $(".menu-options-container").on("click", ".addToCart", function (event) {
    event.preventDefault();
    cartArr.push(Number(event['originalEvent']['path'][2]['id']));
    console.log(`${event['originalEvent']['path'][2]['id']  } added to cart!`);
    console.log('cartArr', cartArr);
    document.getElementsByClassName("cart-demo-btn")[0]['children'][1]['textContent']++;
    console.log(document.getElementsByClassName("cart-demo-btn")[0]['children'][1]['textContent']);
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
    console.log(event);
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
    console.log(cartArr);
  });

  $(".main-container").on("click", ".checkout", function (event) {
    event.preventDefault();
    createOrder(cartArr, event.currentTarget.children[0].children[0].textContent);
    //$('.main-container').children().remove();
    //$('.main-container').append(createSummary());

  });

})

