import { rounding } from "../utils.js";
import { updateQuantity, price, shipping } from "../checkout.js";

export function renderPaymentSummary() {
    let quantity = updateQuantity(); 
    document.querySelector('.payment-summary-quantity').innerHTML = `Items(${quantity})`;
    document.querySelector('.items-total').innerHTML = 
    `$${rounding(price)}`;
    const tax = price / 10;
    document.querySelector('.tax').innerHTML = `$${rounding(tax)}`;
    const added_tax = Number(price) + Number(tax);
    document.querySelector('.shipping-charges').innerHTML = `$${rounding(shipping)}`;
    document.querySelector('.with-tax').innerHTML = `$${rounding(added_tax)}`;
    const amount = (quantity)? (added_tax+shipping): 0;
    document.querySelector('.final-amt').innerHTML = `$${rounding(amount)}`;
}