import { cart, deleteItem, updateIndvQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { rounding } from "./utils.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

console.log(dayjs().format('dddd, MMM D'));

let quantity = 0, price = 0;
let cartHTML = '', shipping = 4.99;

cart.forEach((cartItem) => {
	const matchingItem = products.find(item => item.id === cartItem.id);		
	cartHTML += `
	<div class="cart-item-container js-${matchingItem.id}">
			<div class="delivery-date">
			Delivery date: Tuesday, June 21
			</div>

			<div class="cart-item-details-grid">
			<img class="product-image"
				src="${matchingItem.image}">

			<div class="cart-item-details">
				<div class="product-name">
				${matchingItem.name}
				</div>
				<div class="product-price">
				$${rounding(matchingItem.priceCents)}
				</div>
				<div class="product-quantity">
				<span>
					Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">
						${cartItem.quantity}
					</span>
				</span>
				<span class="update-quantity-link link-primary" 
					data-id = "${matchingItem.id}">
					Update
				</span>
				<input class = "quantity-input js-update-input-${matchingItem.id}">
				<span class="save-quantity-link js-save link-primary"
					data-id = "${matchingItem.id}"> 
					Save </span>
				<span class="delete-quantity-link link-primary 
					js-delete-button"
				data-remove-id = "${matchingItem.id}">
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
					name="delivery-option-${matchingItem.id}">
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
					name="delivery-option-${matchingItem.id}">
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
					name="delivery-option-${matchingItem.id}">
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
		</div>`;	
});
document.querySelector('.js-order-summary').innerHTML = cartHTML;
updatePaySummary();

document.querySelectorAll('.js-delete-button').forEach((link) => {
	link.addEventListener('click', () => {
		const id = link.dataset.removeId;
		deleteItem(id);
		updatePaySummary();
		document.querySelector(`.js-${id}`).remove();		
	});
});

function updatePaySummary(){
	updateQuantity();
	document.querySelector('.cart-checkout-quantity').innerHTML = `${quantity} 	items`;
	document.querySelector('.payment-summary-quantity').innerHTML = `Items(${quantity})`;
	document.querySelector('.items-total').innerHTML = 
	`$${(price / 100).toFixed(2)}`;
	const tax = (price / 1000).toFixed(2);
	document.querySelector('.tax').innerHTML = `$${tax}`;
	const added_tax = Number(price / 100) + Number(tax);
	document.querySelector('.with-tax').innerHTML = `$${added_tax.toFixed(2)}`;
	const amount = (quantity)? (added_tax+shipping): 0;
	document.querySelector('.final-amt').innerHTML = `$${amount.toFixed(2)}`;
}

function updateQuantity(){
	quantity = 0; price = 0;
	cart.forEach((cartItem) => {
		const matchingItem = products.find(item => item.id === cartItem.id);		
		quantity += cartItem.quantity;
		price += cartItem.quantity * matchingItem.priceCents;
	});
}

document.querySelectorAll('.update-quantity-link').forEach((updater) => {
	updater.addEventListener('click', () => {
		const id = updater.dataset.id;
		document.querySelector(`.js-${id}`).classList.add('is-editing');
	});
});

document.querySelectorAll('.js-save').forEach((saver) => {
	saver.addEventListener('click', () => {
		const id = saver.dataset.id;
		updateIndvQuantity(id);
		document.querySelector(`.js-${id}`).classList.remove('is-editing');
		updatePaySummary();
	});
});