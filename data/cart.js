export let cart = JSON.parse(localStorage.getItem('cart')) || 
[{
	id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
	quantity: 2
}, {
	id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
	quantity: 1
}];

function storeCart(){
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function cartUpdate(elem){
	const quan = +(document.querySelector(`.chosen-quantity-${elem.productId}`).value);
	const toFind = cart.find(prop => prop.id === elem.productId);
	if(toFind)
		toFind.quantity += quan;
	else {
		cart.push({
			id: elem.productId,
			quantity: quan, 
			deliveryOptionsId: '1'
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
	const item = cart.find(item => item.id === id);
	item.quantity = +(document.querySelector(`.js-update-input-${id}`).value);
	document.querySelector(`.js-quantity-label-${id}`).innerHTML = item.quantity;
	//console.log(item);
}