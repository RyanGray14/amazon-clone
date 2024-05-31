import { rounding } from "../utils.js";
import { updateQuantity, price, shipping } from "../checkout.js";

export function renderPaymentSummary() {
    let quantity = updateQuantity(); 
    const tax = price / 10;
    const added_tax = Number(price) + Number(tax);
    const amount = (quantity)? (added_tax+shipping): 0;

    const paymentHtml = 
    `<div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div class = "payment-summary-quantity"> 
            Items(${quantity}) </div>
        <div class="payment-summary-money"> 
            $${rounding(price)} </div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money"> 
            $${rounding(tax)} </div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total after tax:</div>
        <div class="payment-summary-money"> 
            $${rounding(added_tax)} </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div> $${rounding(shipping)} </div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
            $${rounding(amount)} </div>
    </div> 

    <button class="place-order-button button-primary">
        Place your order </button> `;
        
    document.querySelector('.payment-summary').innerHTML = paymentHtml;
}