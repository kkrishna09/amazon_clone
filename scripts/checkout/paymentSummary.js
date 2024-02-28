import { cart } from "../../data/cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
// Using MVC  ----> approach Model VIEW CONTROLLER
export function renderPaymentSummary(){
    //modeling 
    let productPriceCents=0;
    let ShippingPriceCents=0;
    
    cart.forEach((cartItem) => {
        const {productId}=cartItem
        const product=getProduct(productId)
        productPriceCents+=product.priceCents*cartItem.quantity

        const deliveryOption=getDeliveryOption(cartItem)
        ShippingPriceCents+=deliveryOption.priceCents
    });
    const totalBeforeTaxCent=productPriceCents+ShippingPriceCents
    const taxCent=totalBeforeTaxCent*0.1
    const totalCent=totalBeforeTaxCent+taxCent

    // view (genrated html)
    const paymentSummaryHTML=`<div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(ShippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCent)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCent)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCent)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    </div>`


    document.querySelector(".js-payment-summary").innerHTML=paymentSummaryHTML
}
