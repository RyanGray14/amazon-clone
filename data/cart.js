export const cart = [];

export function cartUpdate(elem){
	const quan = +(document.querySelector(`.chosen-quantity-${elem.productId}`).value);
	const toFind = cart.find(prop => prop.id === elem.productId);
	if(toFind)
		toFind.quantity += quan;
	else {
		cart.push({
			id: elem.productId,
			name: elem.productName,
			quantity: quan
		});
	}

	let cartQuantity = 0;
	cart.forEach((product) => {
		cartQuantity += product.quantity;
	});
	document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
