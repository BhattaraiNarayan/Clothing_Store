let label=document.getElementById("label");
let ShoppingCart=document.getElementById("shopping-cart");


let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket)
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems=()=>{
    if(basket.length!==0){
        return (ShoppingCart.innerHTML=basket.map((x)=>{
            return`
                <div class="cart-item">Hello</div>
            `
        }).join(""));
    }
    else{
        ShoppingCart.innerHTML=``
        label.innerHTML=`
        <h2>You have no Products.<br />Go to Product Page</h2>
        <a href="index.html">
        <button class="HomeBtn">Product Page</button>
        </a>
        `
    }

};
generateCartItems();