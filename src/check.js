let checkout = document.getElementById("checkout");

let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket)
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



let checkOut = () => {
  let totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
  // Now you can use the totalAmount parameter here in the checkout function
  console.log("Total Amount:", totalAmount);
  // Further logic for checkout
  return (checkout.innerHTML = `
  <div>
    <h1>Your Total Amount is: ¥ ${totalAmount}<br /></h1>
    <h2>To Proceed to Payment.Insert below Information.</h2>
  </div>`);
};

checkOut();
