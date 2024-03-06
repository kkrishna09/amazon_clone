export const deliveryOptions=[
    {
    id:"1",
    deliveryDays:7,
    priceCents:0
    },
    {
    id:"2",
    deliveryDays:3,
    priceCents:10000
    },
    {
    id:"3",
    deliveryDays:1,
    priceCents:30000
    },
]
export function getDeliveryOption(cartItem){
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if (option.id === cartItem.deliveryOptionId){
           deliveryOption=option
        }
    })
    return deliveryOption
}