let products = [
  {
    id: 1,
    name: "Table 1",
    image: "images/product-1.png",
    category: "Table",
    price: 120,
    description: "This is Table 1",
    stockQuantity: 10,
    material: "Wood",
  },
  {
    id: 2,
    name: "Chair 1",
    image: "images/product-4.png",
    category: "Chair",
    price: 50,
    description: "This is Chair 1",
    stockQuantity: 5,
    material: "Plastic",
  },
  {
    id: 3,
    name: "Table 2",
    image: "images/product-9.png",
    category: "Table",
    price: 220,
    description: "This is Table 2",
    stockQuantity: 2,
    material: "Glass",
  },
  {
    id: 4,
    name: "Chair 2",
    image: "images/product-6.png",
    category: "Chair",
    price: 80,
    description: "This is Chair 2",
    stockQuantity: 8,
    material: "Metal",
  },

  {
    id: 14,
    name: "Chair 7",
    image: "images/product-3.png",
    category: "Chair",
    price: 75,
    description: "This is Chair 7",
    stockQuantity: 2,
    material: "Plastic",
  },
  {
    id: 15,
    name: "Table 8",
    image: "images/product-1.png",
    category: "Table",
    price: 240,
    description: "Thisis Table 8",
    stockQuantity: 8,
    material: "Wood",
  },
  {
    id: 16,
    name: "Chair 8",
    image: "images/product-9.png",
    category: "Chair",
    price: 90,
    description: "This is Chair 8",
    stockQuantity: 6,
    material: "Metal",
  },
  {
    id: 17,
    name: "Table 9",
    image: "images/product-7.png",
    category: "Table",
    price: 260,
    description: "This is Table 9",
    stockQuantity: 4,
    material: "Glass",
  },
  {
    id: 18,
    name: "Chair 9",
    image: "images/product-9.png",
    category: "Chair",
    price: 85,
    description: "This is Chair 9",
    stockQuantity: 3,
    material: "Fabric",
  },
];
let ids = products.map((product) => product.id);
let names = products.map((product) => product.name);
localStorage.setItem("product-ids", JSON.stringify(ids));
localStorage.setItem("product-names", JSON.stringify(names));
localStorage.setItem("PRODUCTS", JSON.stringify(products));
let user = localStorage.getItem("name")?.split(" ")[0];
let row = document.querySelector(".product-section .container .row");

function initApp() {
  let products = JSON.parse(localStorage.getItem("ALLPRODUCTS"))
    ? JSON.parse(localStorage.getItem("ALLPRODUCTS"))
    : JSON.parse(localStorage.getItem("PRODUCTS"));
  row.innerHTML = "";
  products.forEach((value, key) => {
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
initApp();

let lists = [];
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
document.querySelector(".wishList .quantity").innerHTML =
  existingWishList.length;
let iconWish = document.querySelectorAll(".wishlist-icon");
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
    const isInWishList = existingWishList.some((item) => item.productId === id);
    if (isInWishList) {
      alert(`Product "${titel}" is already in the wish list!`);
      return;
    }

    // Add the new item to the wish list
    existingWishList.push(wishListItem);

    // Save the updated wish list to local storage
    localStorage.setItem(`wish-list-${user}`, JSON.stringify(existingWishList));

    document.querySelector(".wishList .quantity").innerHTML =
      existingWishList.length;
  });
});
