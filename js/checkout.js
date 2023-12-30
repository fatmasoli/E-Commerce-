// =========chekout page=====
let user = localStorage.getItem("name").split(" ")[0];

let tbodyCheckout = document.querySelector(".checkout-tbody");

let ordersCheckout = JSON.parse(localStorage.getItem("checkout_orders")) || [];

let nameCard = document.querySelector("#cname");
let numberCard = document.querySelector("#ccnum");
let expMonthCard = document.querySelector("#expmonth");
let expYearCard = document.querySelector("#expyear");
let cvv = document.querySelector("#cvv");
let numberCardAlert = document.getElementById("ccnumAlert");
let expMonthCardAlert = document.getElementById("expmonthAlert");
let expYearCardAlert = document.getElementById("expyearAlert");
let cvvAlert = document.getElementById("cvvAlert");

let placeOrder = document.querySelector("#placeorder");
function update() {
  tbodyCheckout.innerHTML = "";
  ordersCheckout.map((order, i) => {
    if (i != ordersCheckout.length - 1) {
      let html = `<tr>
        <td>${order.name} <strong class="mx-2">x</strong> ${order.amount}</td>
        <td>${order.price * order.amount}$</td>
    </tr>`;
      tbodyCheckout.insertAdjacentHTML("afterbegin", html);
    } else {
      let html = `<tr>
    <td class="text-black font-weight-bold"><strong>Cart Total</strong></td>
    <td class="text-black">${order}$</td>
</tr>`;
      tbodyCheckout.insertAdjacentHTML("afterend", html);
    }
  });
}
update();
placeOrder.addEventListener("click", () => {
  if (
    validateCardNumber() &&
    validateCardcvv() &&
    validateCardexpireMonth() &&
    validateCardexpireYear()
  ) {
    placeOrder.textContent = "Wating for approval";
    localStorage.setItem(`orders-${user}`, JSON.stringify(ordersCheckout));

    let cardInfo = {
      nameOnCard: nameCard.value,
      numberCard: numberCard.value,
      expDate: `${expMonthCard.value}/${expYearCard.value}`,
      cvv: cvv.value,
    };
    localStorage.setItem(`${user}-cardInfo`, JSON.stringify(cardInfo));
    nameCard.value =
      numberCard.value =
      expMonthCard.value =
      expYearCard.value =
      cvv.value =
        "";
  } else {
    alert("please add a valid payment method ");
  }
});
document.querySelector(".status").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("checkout_orders");
  document.querySelector(".status-order .border").innerHTML =
    document.querySelector(".table").innerHTML = "";
  document.querySelector(".status-order .border").classList.remove("border");
  if (localStorage.getItem("success")) {
    placeOrder.style.display = "none";
    document.querySelector(".status").style.display = "none";
    document.querySelector(
      ".cont"
    ).innerHTML = `<div class="row" style="width: -webkit-fill-available;">
    <div class="col-md-12 text-center pt-5">
      <span class="display-3 thankyou-icon text-primary">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart-check mb-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
          <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
        </svg>
      </span>
      <h2 class="display-3 text-black">Thank you!</h2>
      <p class="lead mb-5">You order was successfuly completed.</p>
      <p><a href="product.html" class="btn btn-sm btn-outline-black">Back to shop</a></p>
      
    </div>
  </div>`;
    localStorage.removeItem("success");
  } else if (localStorage.getItem("reject")) {
    placeOrder.style.display = "none";
    document.querySelector(".status").style.display = "none";
    document.querySelector(
      ".cont"
    ).innerHTML = `<div class="row" style="width: -webkit-fill-available;">
    <div class="col-md-12 text-center pt-5">
      <span class="display-3">
      
        <svg style="
        width: 1em;
        height: 1em;
    " xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 467.36"><g fill-rule="nonzero"><path fill="#333" d="M58.328 0h281.808c-12.343 13.848-23.287 27.375-32.931 40.444H58.328c-4.93 0-9.416 2.01-12.656 5.227a17.946 17.946 0 00-5.228 12.657v350.705c0 4.868 2.04 9.331 5.289 12.579 3.263 3.263 7.749 5.304 12.595 5.304h395.344c4.815 0 9.286-2.056 12.557-5.327 3.271-3.271 5.327-7.742 5.327-12.556V173.301A950.441 950.441 0 00512 155.387v253.646c0 15.995-6.611 30.592-17.173 41.154-10.562 10.562-25.159 17.173-41.155 17.173H58.328c-15.996 0-30.624-6.58-41.194-17.15C6.596 439.671 0 425.082 0 409.033V58.328c0-16.012 6.565-30.57 17.112-41.132l.084-.084C27.758 6.565 42.317 0 58.328 0z"/><path fill="#01A601" d="M133.575 346.12c18.954-37.25 49.386-79.673 85.902-120.988-33.864-33.1-68.76-63.815-101.133-89.447-4.792-3.783-5.61-10.761-1.827-15.553a10.965 10.965 0 016.573-3.997c25.939-5.128 46.451-2.69 64.755 5.327 17.86 7.833 32.992 20.78 48.842 37.127 6.833 7.054 14.491 15.285 22.63 24.334a900.467 900.467 0 0118.495-17.845c57.165-53.59 121.141-99.314 177.702-120.561 5.732-2.155 12.137.734 14.292 6.466 1.643 4.372.351 9.125-2.889 12.098-23.516 25.09-50.563 51.51-78.786 79.077-29.149 28.475-59.566 58.197-87.904 88.117a1875.046 1875.046 0 0119.779 24.127c26.099 32.405 49.928 64.32 62.668 85.497 3.141 5.25 1.429 12.067-3.821 15.208a11.026 11.026 0 01-7.482 1.422l-34.888-4.425a11.06 11.06 0 01-7.452-4.318c-19.358-25.664-41.613-51.793-65.305-77.304-25.518 29.569-47.513 58.87-62.729 86.895-2.063 3.798-6.037 5.9-10.088 5.778l-47.62-.933c-6.114-.091-10.99-5.135-10.898-11.249a11.252 11.252 0 011.184-4.853z"/></g></svg>
      </span>
      <h2 class="display-3 text-black">SORRY:(</h2>
      <p class="lead mb-5">You order was rejected Sorry:(.</p>
      <p><a href="product.html" class="btn btn-sm btn-outline-black">Back to shop</a></p>
    </div>
  </div>`;
    localStorage.removeItem("reject");
  } else {
    placeOrder.style.display = "none";
    document.querySelector(
      ".cont"
    ).innerHTML = `<div class="row" style="width: -webkit-fill-available;">
  <div class="col-md-12 text-center pt-5">
    <span class="display-3">
    
      <svg style="
      width: 1em;
      height: 1em;
       xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M17,24H7.005a4.014,4.014,0,0,1-3.044-1.4,3.94,3.94,0,0,1-.917-3.158A12.522,12.522,0,0,1,7.445,12a12.522,12.522,0,0,1-4.4-7.444A3.94,3.94,0,0,1,3.961,1.4,4.014,4.014,0,0,1,7.005,0H17a4.017,4.017,0,0,1,3.044,1.4,3.943,3.943,0,0,1,.918,3.155A12.556,12.556,0,0,1,16.551,12a12.557,12.557,0,0,1,4.406,7.448,3.944,3.944,0,0,1-.918,3.156A4.017,4.017,0,0,1,17,24ZM17,2H7.005a2.015,2.015,0,0,0-1.528.7,1.921,1.921,0,0,0-.456,1.556c.376,2.5,1.924,4.84,4.6,6.957a1,1,0,0,1,0,1.568C6.945,14.9,5.4,17.242,5.021,19.741A1.921,1.921,0,0,0,5.477,21.3a2.015,2.015,0,0,0,1.528.7H17a2.014,2.014,0,0,0,1.528-.7,1.917,1.917,0,0,0,.456-1.554c-.373-2.487-1.92-4.829-4.6-6.962a1,1,0,0,1,0-1.564c2.681-2.133,4.228-4.475,4.6-6.963A1.916,1.916,0,0,0,18.523,2.7,2.014,2.014,0,0,0,17,2ZM15.681,20H8.318a1,1,0,0,1-.927-1.374,11.185,11.185,0,0,1,3.471-4.272l.518-.412a1,1,0,0,1,1.245,0l.509.406a11.3,11.3,0,0,1,3.473,4.276A1,1,0,0,1,15.681,20Zm-5.647-2h3.928A11.57,11.57,0,0,0,12,16,11.3,11.3,0,0,0,10.034,18Z"/></>    </span>
    <h2 class="display-3 text-black">Wating!</h2>
    <p class="lead mb-5">You order under review.</p>
    <p>reload page after seconds and check status again</p>
  </div>
</div>`;
  }
});
let orderPrevious = document.querySelector(".Order-Previous");
document
  .querySelector(".Show-Order-Previous")
  .addEventListener("click", function (e) {
    e.preventDefault();

    let order =
      JSON.parse(localStorage.getItem(`ordersPrevious-${user}`)) || [];
    if (order.length == 0) {
      orderPrevious.style.display = "block";
      orderPrevious.innerHTML = x;
    } else if (order.length >= 1) {
      document.querySelector(".Previous-tbody").innerHTML = "";
      order.forEach((element) => {
        let x = `
         
         
            <tr>
              <td>${element.name} <strong class="mx-2">x</strong> ${element.amount}</td>
              <td>${element.price}$</td>
            </tr>
            
        
        `;
        document
          .querySelector(".Previous-tbody")
          .insertAdjacentHTML("beforeEnd", x);
      });
    }
  });
document
  .querySelector(".Order-Previous-Table")
  .addEventListener("click", function (e) {
    orderPrevious.innerHTML = document.querySelector(
      ".Order-Previous-Table"
    ).innerHTML = "";
  });
function validateCardNumber() {
  let number = +numberCard.value;
  let regex = /^4[0-9]{12}/;

  if (regex.test(number)) {
    numberCard.classList.add("is-valid");
    numberCard.classList.remove("is-invalid");
    numberCardAlert.classList.add("d-none");

    return true;
  } else {
    numberCard.classList.add("is-invalid");
    numberCard.classList.remove("is-valid");
    numberCardAlert.classList.remove("d-none");
    numberCardAlert.innerHTML =
      "Visa card number can have  13 digits in total, including the first 4.";
    return false;
  }
}
function validateCardexpireMonth() {
  let number = expMonthCard.value;

  if (number.length == 2) {
    expMonthCard.classList.add("is-valid");
    expMonthCard.classList.remove("is-invalid");
    expMonthCardAlert.classList.add("d-none");

    return true;
  } else {
    expMonthCard.classList.add("is-invalid");
    expMonthCard.classList.remove("is-valid");
    expMonthCardAlert.classList.remove("d-none");
    expMonthCardAlert.innerHTML = "Month must be 2digt only like  09 or 11 .";
    return false;
  }
}
function validateCardexpireYear() {
  let number = +expYearCard.value;

  if (number >= 2024) {
    expYearCard.classList.add("is-valid");
    expYearCard.classList.remove("is-invalid");
    expYearCardAlert.classList.add("d-none");

    return true;
  } else {
    expYearCard.classList.add("is-invalid");
    expYearCard.classList.remove("is-valid");
    expYearCardAlert.classList.remove("d-none");
    expYearCardAlert.innerHTML = "year must be More than  2024.";
    return false;
  }
}

function validateCardcvv() {
  let number = cvv.value;

  if (number.length == 3) {
    cvv.classList.add("is-valid");
    cvv.classList.remove("is-invalid");
    cvvAlert.classList.add("d-none");

    return true;
  } else {
    cvv.classList.add("is-invalid");
    cvv.classList.remove("is-valid");
    cvvAlert.classList.remove("d-none");
    cvvAlert.innerHTML = "year must be 3digt.";
    return false;
  }
}
