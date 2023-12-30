let user = localStorage.getItem("name").split(" ")[0];
let body = document.querySelector("tbody");
let cartOrders = JSON.parse(localStorage.getItem("orders"));

console.log(cartOrders);
const tbody = function (ordes) {
  body.innerHTML = "";
  ordes.map((elm, i) => {
    let tr = ` <tr>
    <td class="product-thumbnail">
      <img src=${elm.img} alt="Image" class="img-fluid">
    </td>
    <td class="product-name">
      <h2 class="h5 text-black">${elm.name}</h2>
    </td>
    <td id='price'> ${elm.price}</td>
    <td>
     <div class='amount'>
    <button class="decrease" type="button" id='decrement'>&minus;</button>
        
    <input type="number" pattern="[0-9]" readonly class="quantity-amount" id="number" value="1"  >
   
      <button class="increase" type="button" id='increment'>&plus;</button>
</div>

    </td>
    
    <td><a href="#" class="btn btn-black btn-sm remove-item" data-index="${i}"">X</a></td>
  </tr>`;
    body.insertAdjacentHTML("afterend", tr);
  });
};

tbody(cartOrders);

const removeButtons = document.querySelectorAll(".remove-item");
removeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // debugger;
    e.preventDefault();
    const index = parseInt(e.target.getAttribute("data-index"));

    cartOrders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(cartOrders));
    tbody(cartOrders);

    location.reload();
  });
});

let increment = document.getElementsByClassName("increase");
let decrement = document.getElementsByClassName("decrease");
let total = document.getElementsByClassName("total")[0];
for (const elm of increment) {
  elm.addEventListener("click", (e) => {
    let priceProduct = parseInt(
      e.target.parentNode.parentNode.parentNode.children[2].innerHTML
    );
    let amount = e.target.parentNode.children.number;

    amount.value = parseInt(amount.value) + 1;
    getTotalPrice();
  });
}

for (const elm of decrement) {
  elm.addEventListener("click", (e) => {
    let amount = e.target.parentNode.children.number;

    // document.getElementsByClassName("amount")[0].children.number.value
    if (amount.value > 1) {
      amount.value = parseInt(amount.value) - 1;
      getTotalPrice();
    }
  });
}
let cartOrders2 = [];
function getTotalPrice() {
  let allToatal = 0;
  cartOrders2 = [];
  for (const el of document.getElementsByTagName("tbody")) {
    if (el.innerHTML != "") {
      let amount = +el.querySelector("#number").value;

      let price = parseInt(el.querySelector("#price").textContent);
      let totalPriceElment = amount * price;
      let srcimg = el.getElementsByTagName("img")[0].src;
      allToatal += totalPriceElment;
      cartOrders2.push({
        name: el.querySelector(".h5").textContent,
        price: parseInt(el.querySelector("#price").innerHTML),
        amount: +el.querySelector("#number").value,
        img: `images${srcimg.slice(srcimg.lastIndexOf("/"))}`,
      });
    }
  }
  cartOrders2.push(allToatal);
  console.log(cartOrders2);
  total.textContent = `${allToatal}$`;
}
getTotalPrice();

let checkOut = document.querySelector(
  "body > div > div > div:nth-child(2) > div > div > div:nth-child(3) > div > button"
);
checkOut.addEventListener("click", () => {
  localStorage.setItem("checkout_orders", JSON.stringify(cartOrders2));
  localStorage.removeItem("orders");
});

