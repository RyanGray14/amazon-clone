import { getProduct } from "../scripts/utils.js";

export let cart;
loadFromStorage();

export function loadFromStorage(){
	cart = JSON.parse(localStorage.getItem('cart')) || 
[{
	id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
	quantity: 2, 
	deliveryOptionId: '1'
}, {
	id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
	quantity: 1, 
	deliveryOptionId: '1'
}];
}
export function storeCart(){
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function cartUpdate(elemId, quan){
	const toFind = getProduct(cart, elemId);
	if(toFind)
		toFind.quantity += quan;
	else {
		cart.push({
			id: elemId,
			quantity: quan, 
			deliveryOptionId: '1'
		});
	}
	storeCart();
}

export function deleteItem(prodId){
	const index = cart.findIndex(obj => obj.id === prodId)
	if(index >= 0)
		cart.splice(index, 1);
	storeCart();
}

export function updateIndvQuantity(id){
	const item = getProduct(cart, id);
	item.quantity = +(document.querySelector(`.js-update-input-${id}`).value);
	document.querySelector(`.js-quantity-label-${id}`).innerHTML = item.quantity;
	storeCart();
	//console.log(item);
}

export function updateDeliveryOption(pId, delOptionId){
	const matchingItem = getProduct(cart, pId);
	matchingItem.deliveryOptionId = delOptionId;
	storeCart();
}