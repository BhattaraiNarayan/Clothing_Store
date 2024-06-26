let shop=document.querySelector('#shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];



let generateShop=()=>{
    return (shop.innerHTML = shopItemsData
      .map((item) => {
        let{id,name,price,desc,img}=item;
         let search = basket.find((x) => x.id === id) || [];
        
        return `
        <div id=product-id-${id} class="item">
            <img width="200" height="200" src=${img} alt="" class="img">
            <div class="details">
                <h3>${name}</h3>
                <p class="para">${desc}</p>
                <div class="price-quantity">
                    <h2>¥ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-trash3"></i>
                        <div id=${id} class="quantity">
                          ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
        </div>    
    </div>`;
      })
      .join(""));
    };

generateShop();


let increment=(id)=>{
   // let selectedItem=id;
    let search=basket.find((x)=>x.id===id)
  
    if(search===undefined){
      basket.push({
        id:id,
        item:1,
      });
    }else{
      search.item+=1;
    };
  //  console.log(basket);
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
 basket = basket.filter((x) => x.item !== 0);    //to delete the item which is zero in local storage
 // console.log(basket);
 localStorage.setItem("data", JSON.stringify(basket));
};


let update =(id)=>{
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML=search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
