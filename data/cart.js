export const cart = [{
	id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
	quantity: 2
}, {
	id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
	quantity: 1
}];

export function cartUpdate(elem){
	const quan = +(document.querySelector(`.chosen-quantity-${elem.productId}`).value);
	const toFind = cart.find(prop => prop.id === elem.productId);
	if(toFind)
		toFind.quantity += quan;
	else {
		cart.push({
			id: elem.productId,
			quantity: quan
		});
	}
	
	let cartQuantity = 0;
	cart.forEach((product) => {
		cartQuantity += product.quantity;
	});
	document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
