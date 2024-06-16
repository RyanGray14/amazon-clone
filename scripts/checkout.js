import { cart } from "../data/cart.js";
import '../data/cart-class.js';
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/delivery.js";
import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/PaymentSummary.js";

export let price = 0, shipping = 0;

renderOrderSummary();
renderPaymentSummary();

export function updateQuantity(){
	let quantity = 0; 
	price = shipping = 0;
	cart.forEach((cartItem) => {
		const matchingItem = products.find(item => item.id === cartItem.id);		
		quantity += cartItem.quantity;
		price += cartItem.quantity * matchingItem.priceCents;
		const delOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
		shipping += delOption.priceCents;
	});
	return quantity;
}

document.querySelector('.cart-checkout-quantity').innerHTML = `${updateQuantity()} 	items`;
