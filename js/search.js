let searchValue = document.getElementById("searchValue");

let searchCategory = document.getElementById("searchCategory");

let productContainer = JSON.parse(localStorage.getItem("ALLPRODUCTS"))
  ? JSON.parse(localStorage.getItem("ALLPRODUCTS"))
  : JSON.parse(localStorage.getItem("PRODUCTS"));

function searchProduct() {
  let ids = [];
  let result = productContainer.map((elm, i) => {
    let nameProduct = elm.name.toLowerCase();
    let value = searchValue.value;
    nameProduct.includes(value) ? ids.push(elm.id) : console.log("not found");
  });
  let products = [];

  for (const id of ids) {
    let searchProduct = productContainer
      .filter((elm, i) => elm.id == id)
      .flat();
    products.push(searchProduct);
  }

  if (products.length > 0) {
    row.innerHTML = "";
    products.flat().forEach((value, key) => {
      let newDiv = `
            <div class="col-12 col-md-5 col-sm-6 col-lg-4 col-xl-3 mb-5" id="${value.id}">
    
            <a class="shop-item" >
            <img src=${value.image} class="img-fluid product-thumbnail data-toggle="tooltip" data-placement="top" title="${value.description}"">
            <h3 class="product-title">${value.name}</h3>
            <strong class="product-price">${value.price}.00$</strong>
            
    
            <div class="d-flex  justify-content-between">
            <span class="wishlist-icon" >🤎</span>
            <span class="icon-cross">
                <img src="images/cross.svg" class="img-fluid">
            </span></div>
        </a>
        </div>`;

      row.insertAdjacentHTML("afterbegin", newDiv);
    });
  }

  let lists = JSON.parse(localStorage.getItem("orders")) || [];
  let quantity = document.querySelector(".shopping .quantity");
  quantity.innerHTML = JSON.parse(localStorage.getItem("orders"))
    ? JSON.parse(localStorage.getItem("orders")).length
    : 0;
  let addCart = document.querySelectorAll(".icon-cross");
  addCart.forEach((elm, i) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();
      elm.style.filter = "invert(1)";
      let parent = e.target.parentNode.parentNode.parentNode.children;
      let allsrc = parent[0].src;
      let srcImg = `images${allsrc.slice(allsrc.lastIndexOf("/"))}`;

      let titel = parent[1].textContent;
      let price = parent[2].textContent;
      let obj = {
        name: titel,
        price: price,
        img: srcImg,
      };

      const isFind = lists.find((elm) => elm.name === obj.name);

      if (isFind === undefined) lists.push(obj);

      localStorage.setItem("orders", JSON.stringify(lists));

      quantity.innerHTML = lists.length;
    });
  });
  const existingWishList =
    JSON.parse(localStorage.getItem(`wish-list-${user}`)) || [];
  let iconWish = document.querySelectorAll(".wishlist-icon");
  document.querySelector(".wishList .quantity").innerHTML =
    existingWishList.length;
  iconWish.forEach((elm, i) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();
      let id = e.target.parentNode.parentNode.parentNode.id;
      let parent = e.target.parentNode.parentNode.children;
      let allsrc = parent[0].src;
      let srcImg = `images${allsrc.slice(allsrc.lastIndexOf("/"))}`;

      let titel = parent[1].textContent;
      let price = parent[2].textContent;
      elm.style.filter = "brightness(1.5)";

      const wishListItem = {
        productId: id,
        productName: titel,
        image: srcImg,
        price: price,
      };

      // Check if the product is already in the wish list
      const isInWishList = existingWishList.some(
        (item) => item.productId === id
      );
      if (isInWishList) {
        alert(`Product "${titel}" is already in the wish list!`);
        return;
      }

      // Add the new item to the wish list
      existingWishList.push(wishListItem);

      // Save the updated wish list to local storage
      localStorage.setItem(
        `wish-list-${user}`,
        JSON.stringify(existingWishList)
      );

      document.querySelector(".wishList .quantity").innerHTML =
        existingWishList.length;
    });
  });
}

// search By Category

// Rename the function for searching by category
function searchByCategory() {
  let value = searchCategory.value;
  let result = productContainer.filter((elm, i) => {
    let nameProduct = elm.category.toLowerCase();
    return nameProduct == value;
  });
 

  

  if (result.length > 0) {
    row.innerHTML = "";
    result.flat().forEach((value, key) => {
      let newDiv = `
              <div class="col-12 col-md-5 col-sm-6 col-lg-4 col-xl-3 mb-5" id="${value.id}">
      
              <a class="shop-item" >
              <img src=${value.image} class="img-fluid product-thumbnail data-toggle="tooltip" data-placement="top" title="${value.description}"">
              <h3 class="product-title">${value.name}</h3>
              <strong class="product-price">${value.price}.00$</strong>
              
      
              <div class="d-flex  justify-content-between">
              <span class="wishlist-icon" >🤎</span>
              <span class="icon-cross">
                  <img src="images/cross.svg" class="img-fluid">
              </span></div>
          </a>
          </div>`;

      row.insertAdjacentHTML("afterbegin", newDiv);
    });
  }

  let lists = JSON.parse(localStorage.getItem("orders")) || [];
  let quantity = document.querySelector(".shopping .quantity");
  quantity.innerHTML = JSON.parse(localStorage.getItem("orders"))
    ? JSON.parse(localStorage.getItem("orders")).length
    : 0;
  let addCart = document.querySelectorAll(".icon-cross");
  addCart.forEach((elm, i) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();
      elm.style.filter = "invert(1)";
      let parent = e.target.parentNode.parentNode.parentNode.children;
      let allsrc = parent[0].src;
      let srcImg = `images${allsrc.slice(allsrc.lastIndexOf("/"))}`;

      let titel = parent[1].textContent;
      let price = parent[2].textContent;
      let obj = {
        name: titel,
        price: price,
        img: srcImg,
      };

      const isFind = lists.find((elm) => elm.name === obj.name);

      if (isFind === undefined) lists.push(obj);

      localStorage.setItem("orders", JSON.stringify(lists));

      quantity.innerHTML = lists.length;
    });
  });
  const existingWishList =
    JSON.parse(localStorage.getItem(`wish-list-${user}`)) || [];
  let iconWish = document.querySelectorAll(".wishlist-icon");
  document.querySelector(".wishList .quantity").innerHTML =
    existingWishList.length;
  iconWish.forEach((elm, i) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();
      let id = e.target.parentNode.parentNode.parentNode.id;
      let parent = e.target.parentNode.parentNode.children;
      let allsrc = parent[0].src;
      let srcImg = `images${allsrc.slice(allsrc.lastIndexOf("/"))}`;

      let titel = parent[1].textContent;
      let price = parent[2].textContent;
      elm.style.filter = "brightness(1.5)";

      const wishListItem = {
        productId: id,
        productName: titel,
        image: srcImg,
        price: price,
      };

      // Check if the product is already in the wish list
      const isInWishList = existingWishList.some(
        (item) => item.productId === id
      );
      if (isInWishList) {
        alert(`Product "${titel}" is already in the wish list!`);
        return;
      }

      // Add the new item to the wish list
      existingWishList.push(wishListItem);

      // Save the updated wish list to local storage
      localStorage.setItem(
        `wish-list-${user}`,
        JSON.stringify(existingWishList)
      );

      document.querySelector(".wishList .quantity").innerHTML =
        existingWishList.length;
    });
  });
}
searchValue.onblur = function () {
  if (searchValue.value == "") {
    console.log("assa");
    location.reload();
  }
};

searchCategory.onblur = function () {
    if (searchCategory.value == "") {
     
      location.reload();
    }
  };
  