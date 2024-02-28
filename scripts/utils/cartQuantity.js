import { cart } from "../../data/cart.js";

export function updateCartQuantity(classs){
    let cartQuantity=0
    cart.forEach((cartItem)=>{
      cartQuantity +=cartItem.quantity;
    })
    document.querySelector(classs).innerHTML=cartQuantity
  }