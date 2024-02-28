import { cart, removeFromCart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { updateCartQuantity } from "../utils/cartQuantity.js";
import { formatCurrency } from "../utils/money.js";
let cartSummaryHTML=''
console.log(cart)
cart.forEach((cartItem)=>{
    const productId=cartItem.productId
    const index = products.findIndex(product => product.id === productId);
    const product = products[index]
    cartSummaryHTML+=`<div class="cart-item-container  js-cart-item-container-${productId}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${product.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label  js-quantity-label-${productId}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${productId}>Update</span>
          <span class="delete-quantity-link js-delete-link link-primary" data-product-id=${productId}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
})

updateCartQuantity(".js-checkout")
document.querySelector(".js-order-summary").innerHTML=cartSummaryHTML

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId
        removeFromCart(productId)
        updateCartQuantity(".js-checkout")
    })
})


document.querySelectorAll(".js-update-quantity-link").forEach((update) => {
  update.addEventListener("click", () => {
      console.log("inside");
      const productId = update.dataset.productId;
      console.log(productId);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `
          <input class="update-quantity-input js-update-quantity-input-${productId}" type="number" max="10">
          <span class="update-quantity-link link-primary js-submit-quantity-link" data-product-id="${productId}">Submit</span>
      `;
      
      // Now, attach event listener for submit button
      document.querySelectorAll(".js-submit-quantity-link").forEach((submit) => {
          submit.addEventListener("click", () => {
              console.log("submit clicked");
              const productId = submit.dataset.productId;
              const value = document.querySelector(`.js-update-quantity-input-${productId}`).value;
              document.querySelector(`.js-quantity-label-${productId}`).innerHTML = value;
              cart.map((item)=>{
                if(item.productId == productId){
                  item.quantity=parseInt(value)
                  updateCartQuantity(".js-checkout")
                  saveToStorage(cart)
                  
                }
              })
          });
      });
  });
});

