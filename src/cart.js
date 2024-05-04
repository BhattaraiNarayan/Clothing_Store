let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket)
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id);
        return `
                <div class="cart-item">
                    <img width="100" src=${search.img} alt="">
                        <div class="details">
                               <div class="title-price-x">
                                    <h4 class="title-price">
                                        <p>${search.name}</p>
                                        <p class="cart-item-price">¥ ${
                                          search.price
                                        }</p>
                                    </h4>
                                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                                </div>
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-trash3"></i>
                                <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                            <h3>¥ ${item * search.price}</h3>
                        </div>
                </div>
            `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>You have no Products.<br />Go to Product Page</h2>
        <a href="index.html">
        <button class="HomeBtn">Product Page</button>
        </a>
        `;
  }
};
generateCartItems();

let increment = (id) => {
  // let selectedItem=id;
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  //  let selectedItem = id;
  let search = basket.find((x) => x.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(id);
  basket = basket.filter((x) => x.item !== 0); //to delete the item which is zero in local storage
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () =>{
  basket = [];
   generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    localStorage.setItem("totalAmount", JSON.stringify(amount));
    label.innerHTML = `
    <h2 class="labelName">Total Bill: ¥ ${amount}</h2>
    <a href="check.html" class="checkout-link">Checkout</a>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();
