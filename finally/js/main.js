//  * ////////////////////////////////// js for admin //////////////////////////////

// log Out
function logOut() {
  window.location.href = "index.html";
}

//  * ////////////////////////////////// END js for admin ///////////////////////////

//  * ////////////////////////////////// Crud Admin Add Product ///////////////////////////
let productImage = document.getElementById("productImage");
let productName = document.getElementById("productName");
let productId = document.getElementById("productId");
let productCategory = document.getElementById("productCategory");
let productPrice = document.getElementById("productPrice");
let productDesc = document.getElementById("productDesc");
let productStock = document.getElementById("productStock");
let searchValue = document.getElementById("searchValue");
let addBtn = document.getElementById("addProduct");
let pnameAlert = document.getElementById("pnameAlert");
let pnameAlertId = document.getElementById("pnameAlertId");
let duplicatename = document.getElementById("duplicatename");
let searchCategory = document.getElementById("searchCategory");

let currentIndex = 0;
let productContainer = JSON.parse(localStorage.getItem("ALLPRODUCTS"))
  ? JSON.parse(localStorage.getItem("ALLPRODUCTS"))
  : JSON.parse(localStorage.getItem("PRODUCTS"));

let ids = JSON.parse(localStorage.getItem("product-ids"));
let names = JSON.parse(localStorage.getItem("product-names"));

function validateid(event) {
  let pId = productId.value;
  let validId = ids.some((elm) => elm === +pId);

  if (!validId) {
    productId.classList.add("is-valid");
    productId.classList.remove("is-invalid");
    pnameAlertId.classList.add("d-none");

    return true;
  } else {
    pnameAlertId.innerHTML = "ID is already exists";
    productId.classList.add("is-invalid");
    productId.classList.remove("is-valid");
    pnameAlertId.classList.remove("d-none");
    return false;
  }
}
function validateProduct(event) {
  let pnameRegex = /^[A-Z][a-z\d\s]{3,14}$/;
  let pname = productName.value;

  if (pnameRegex.test(pname) == true) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    pnameAlert.classList.add("d-none");
    let validname = names.some((elm) => elm === pname);
    if (!validname) {
      productName.classList.add("is-valid");
      productName.classList.remove("is-invalid");
      duplicatename.classList.add("d-none");

      return true;
    } else {
      duplicatename.innerHTML = "name is already exists";
      productName.classList.add("is-invalid");
      productName.classList.remove("is-valid");
      duplicatename.classList.remove("d-none");
      return false;
    }
  } else {
    pnameAlert.innerHTML =
      "please start with a capital letter and more than 3 letters";
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    pnameAlert.classList.remove("d-none");
    return false;
  }
}

function createProduct() {
  let product = {
    id: +productId.value,
    name: productName.value,
    image: `images/${productImage.value.split("\\").at(-1)}`,
    category: productCategory.value,
    price: productPrice.value,

    desc: productDesc.value,

    stockQuantity: +productStock.value,
  };

  productContainer.push(product);
}

// let addBtn = document.getElementById('addProduct');

addBtn.onclick = function () {
  if (
    validateProduct() &&
    validateid() &&
    productName.value != "" &&
    productCategory.value != "" &&
    productDesc.value != "" &&
    productPrice.value != ""
  ) {
    console.log("Product");
    if (addBtn.innerHTML == "AddProduct") {
      ids.push(+productId.value);
      names.push(productName.value);
      // debugger;
      createProduct();
      localStorage.setItem("product-ids", JSON.stringify(ids));
      console.log(productContainer);
      console.log(555);
    } else {
      // Do something else if needed
    }

    localStorage.setItem("ALLPRODUCTS", JSON.stringify(productContainer));
    localStorage.setItem("product-ids", JSON.stringify(ids));
    localStorage.setItem("product-names", JSON.stringify(names));
    clearForm();
    display();
  } else {
    alert("Not Valid");
  }
};

function display() {
  let pro = "";
  for (let i = 0; i < productContainer.length; i++) {
    pro += `
          <div class="col-lg-4 ">
            <div class="card shadow mb-5">
              <div class="card-img overflow-hidden">
                <img src="../images/${
                  productContainer[i].img
                }" class="card-img-top">
              </div>
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                <p>ID :${i + 1}</p>
                  <h3 class="card-title">${productContainer[i].pname}</h3>
                  <h5 class="card-title">${productContainer[i].price}</h5>
                  <p class="card-title">Category ${
                    productContainer[i].category
                  }</p>
                  <p class="card-title">DES ${productContainer[i].desc}</p>
                  <p>Order</p>
                  <button Onclick=" addToWishList(${i})" class="btn">Add To WishList
                  <a><i class="fa-sharp fa-regular fa-heart"></i></a>
                </button> 
                </div>
              </div>
            </div>
          </div>`;
  }
  let productBody = document.getElementById("productBody");
  if (productBody) {
    productBody.innerHTML = pro;
  } else {
    console.error('Element with ID "productBody" not found.');
  }
}

// search by name

function clearForm() {
  productName.classList.remove("is-valid");
  productId.classList.remove("is-valid");
  productImage.value = "";
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  productId.value = "";
  productStock.value = "";
}

// search by Name

function searchProduct() {
  let pro = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].pname
        .toLowerCase()
        .includes(searchValue.value.toLowerCase())
    ) {
      pro += `
      <div class="col-lg-4 ">
        <div class="card shadow mb-5">
          <div class="card-img overflow-hidden">
            <img src="../images/${productContainer[i].img}" class="card-img-top">
          </div>
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h3 class="card-title">${productContainer[i].pname}</h3>
              <h5 class="card-title">${productContainer[i].price}</h5>
              <p class="card-title">Category ${productContainer[i].category}</p>
              <p class="card-title">DES ${productContainer[i].desc}</p>
              <p>Order</p>
            
            </div>
          </div>
        </div>
      </div>`;
    }
  }
  document.getElementById("productBody").innerHTML = pro;
}

// search By Category

// Rename the function for searching by category
function searchByCategory() {
  let pro = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].category
        .toLowerCase()
        .includes(searchCategory.value.toLowerCase())
    ) {
      pro += `
        <div class="col-lg-4 ">
          <div class="card shadow mb-5">
            <div class="card-img overflow-hidden">
              <img src="../images/${productContainer[i].img}" class="card-img-top">
            </div>
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3 class="card-title">${productContainer[i].pname}</h3>
                <h5 class="card-title">${productContainer[i].price}</h5>
                <p class="card-title">Category ${productContainer[i].category}</p>
                <p class="card-title">DES ${productContainer[i].desc}</p>
                <p>Order</p>
      
              </div>
            </div>
          </div>
        </div>`;
    }
  }
  document.getElementById("productBody").innerHTML = pro;
}

//  * ////////////////////////////////// End Crud Admin  //////////////////////////////

//  * //////////////////////////////////// feedBack //////////////////////////////////

function submitFeedback() {
  let feedName = document.getElementById("feedName");
  let feedMessage = document.getElementById("feedMessage");

  // Proceed with saving data to localStorage
  let userFeedBack = JSON.parse(localStorage.getItem("feedBackUser")) || [];

  userFeedBack.push({
    fname: feedName.value,
    fMessage: feedMessage.value,
  });
  feedName.value = "";
  feedMessage.value = "";
  feedMessage.blur();
  localStorage.setItem("feedBackUser", JSON.stringify(userFeedBack));
}

//    *  /////////// End FeedBack Function

//  * //////////////////////////////////////////  WishList //////////////////////////////////////
