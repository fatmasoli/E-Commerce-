let user = localStorage.getItem("name").split(" ")[0];
let table1 = document.querySelector(".site-block-order-table");
let eamil = localStorage.getItem("email");
let ordercheck = JSON.parse(localStorage.getItem(`orders-${user}`));
console.log(ordercheck);
let body = document.querySelector("body > section > article");
let btns = document.querySelector(".btns");
let confirmButton = document.createElement("button");
let rejectButton = document.createElement("button");
confirmButton.setAttribute("class", "btn btn-confirm");
rejectButton.setAttribute("class", "btn btn-reject");
confirmButton.textContent = "CONFIRM";
rejectButton.textContent = "REJECT";
btns.appendChild(confirmButton);
btns.appendChild(rejectButton);
let tbodyCheckout = document.querySelector(".confirm-tbody");
let tbodyPayment = document.querySelector(".Payment-body");
let caption = `<caption><strong>Order's ${eamil}</strong> </caption>`;
let cardinformation = JSON.parse(localStorage.getItem(`${user}-cardInfo`));
table1.insertAdjacentHTML("beforebegin", caption);
function update() {
  if (ordercheck) {
    ordercheck.map((order, i) => {
      if (i != ordercheck.length - 1) {
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
  } else {
    tbodyCheckout.innerHTML = "";
  }
}
update();
function updatePayment() {
  if (cardinformation) {
    let html = `<tr>
        <td> nameOnCard</td>
       <td> ${cardinformation.nameOnCard}</td>
        
    </tr>
    <tr>
        <td>numberCard </td><td>${cardinformation.numberCard}</td>
        
    </tr><tr>
    <td>expDate </td><td> ${cardinformation.expDate}</td>
    
</tr><tr>
<td>cvv </td><td> ${cardinformation.cvv}</td>

</tr><tr>
<td>Name user </td><td> ${localStorage.getItem("name")}</td>

</tr>
    
    `;
    tbodyPayment.insertAdjacentHTML("afterbegin", html);
  } else {
  }
}
if (localStorage.getItem(`${user}-cardInfo`)) {
  updatePayment();
} else {
  document.getElementById("Payment").classList.add("d-none");
}

let allorderslocal = JSON.parse(localStorage.getItem("allorders"))
  ? JSON.parse(localStorage.getItem("allorders"))
  : [];
let orderPrevious = JSON.parse(localStorage.getItem(`ordersPrevious-${user}`))
  ? JSON.parse(localStorage.getItem(`ordersPrevious-${user}`))
  : [];

console.log(allorderslocal);
confirmButton.onclick = function () {
  localStorage.setItem("success", "success");
  ordercheck.push(localStorage.getItem("name"));
  console.log(ordercheck);
  console.log(allorderslocal);
  allorderslocal.push(ordercheck);
  console.log(allorderslocal);
  localStorage.setItem("allorders", JSON.stringify(allorderslocal));

  localStorage.removeItem(`orders-${user}`);
  console.log(localStorage.getItem(`orders-${user}`));
  ordercheck.length = ordercheck.length - 2;
  orderPrevious.push(...ordercheck);
  localStorage.setItem(`ordersPrevious-${user}`, JSON.stringify(orderPrevious));
  localStorage.removeItem(`${user}-cardInfo`);
  tbodyCheckout.innerHTML = "";
  location.reload();
};
rejectButton.onclick = function () {
  localStorage.removeItem(`orders-${user}`);
  localStorage.setItem("reject", "reject");
  localStorage.removeItem(`${user}-cardInfo`);

  table1.innerHTML = "";
  location.reload();
};
let allorderstabel = document.querySelector("#tbody");

(function showData() {
  let allorders = JSON.parse(localStorage.getItem("allorders"));
  console.log(allorders);
  allorderstabel.innerHTML = "";
  allorders.forEach((element, i) => {
    let body = "";
    console.log(element);
    element.map((elm, i) => {
      console.log(elm);
      if (i != element.length - 1 && i != element.length - 2) {
        console.log(elm.img, elm.price, elm.name);
        body = `<tr >
       <td> <img src="${elm.img}" width=50px height=50px>  </td>
        <td class="h4" style="max-width:15px;"> ${elm.name}  </td>
        <td class="h4"> ${elm.price}  </td>

       <td class='ha h4'>${elm.amount} </td>
       <td class="h4">${element[element.length - 1]} </td>
       </tr>
`;
        //       if (i == allorders.length - 1) {
        //         body += `       <td> ${element}}</td>
        // </tr>`;}
        document.querySelector("#tbody").innerHTML += body;
      }
    });
  });
})(); //
