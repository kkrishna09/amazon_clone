import { cart, removeFromCart, saveToStorage, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct} from "../../data/products.js";
import { updateCartQuantity } from "../utils/cartQuantity.js";
import { getDay } from "../utils/getDay.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary(){
  let cartSummaryHTML=''

  cart.forEach((cartItem)=>{
      const productId=cartItem.productId

      const product=getProduct(productId)

      const deliveryOption=getDeliveryOption(cartItem);

      cartSummaryHTML+=`<div class="cart-item-container  js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${getDay(deliveryOption.deliveryDays)}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${product.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            Rs ${formatCurrency(product.priceCents)}
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
          ${deliveryOptionsHTML(productId,cartItem)}
        </div>
      </div>
    </div>`
  })

  function deliveryOptionsHTML(productId,cartItem){
    let html=``
    deliveryOptions.forEach((option)=>{
      const dateString =getDay(option.deliveryDays)
      const priceString= option.priceCents===0? "FREE": `Rs ${formatCurrency(option.priceCents)} -`
      const isChecked = option.id === cartItem.deliveryOptionId
      html+=`<div class="delivery-option js-delivery-option" data-product-id="${productId}" data-option-id="${option.id}">
      <input type="radio" ${isChecked?"checked":""}
        class="delivery-option-input"
        name="delivery-option-${productId}">
      <div>
        <div class="delivery-option-date">
        ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString}  Shipping
        </div>
      </div>
    </div>`
    })

    return html
  }

  updateCartQuantity(".js-checkout")
  document.querySelector(".js-order-summary").innerHTML=cartSummaryHTML

  document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
          const productId=link.dataset.productId
          removeFromCart(productId)
          updateCartQuantity(".js-checkout")
          renderPaymentSummary()
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
                    renderPaymentSummary()
                    renderOrderSummary()
                  }
                })
            });
        });
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,optionId}= element.dataset
      updateDeliveryOption(productId,optionId)
      renderOrderSummary()
      renderPaymentSummary()
    })
  })
}