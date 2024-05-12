
let productsHTML = '';

products.forEach((item) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(item.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "chosen-quantity-${item.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added added-${item.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary adding"
		  data-product-id = "${item.id}"
		  data-product-name = "${item.name}">
            Add to Cart
          </button>
        </div>`;
}); 

document.querySelector('.js-products').innerHTML = productsHTML;

const msgTimeouts = [];

document.querySelectorAll('.adding').forEach((button) => {
	button.addEventListener('click', () => {
		const pId = button.dataset.productId;
    	const quan = +(document.querySelector(`.chosen-quantity-${pId}`).value);
		const toFind = cart.find(prop => prop.id === pId);
		if(toFind)
			toFind.quantity += quan;
		else {
			cart.push({
				id: pId,
				name: button.dataset.productName,
				quantity: quan
			});
		}

		document.querySelector(`.added-${pId}`).classList.add('added-msg');
		setTimeout(() => {
			const prevTout = msgTimeouts[pId];
			if (prevTout) clearTimeout(prevTout);
				  
			const timeoutId = setTimeout(() => {
				document.querySelector(`.added-${pId}`).classList.remove('added-msg');
			}, 2000);
	  
			msgTimeouts[pId] = timeoutId;
		});
		
		let cartQuantity = 0;
		cart.forEach((product) => {
			cartQuantity += product.quantity;
		});
		document.querySelector('.cart-quantity').innerHTML = cartQuantity;
		console.clear();
		console.log(cart);
	});
});