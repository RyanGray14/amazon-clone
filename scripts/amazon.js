/*const products = [{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg', 
    name: 'Black and Grey athletic Cotton Socks - 6 pairs', 
    rating: {
        stars: 4.5, 
        count: 87
    }, 
    price: 1090
}, {
    image: 'images/products/intermediate-composite-basketball.jpg', 
    name: 'Intermediate Size Basketball', 
    rating: {
        stars: 4,
        count: 127
    },
    price: 2095
}, {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg', 
    name: 'Adults Plain Cotton T-Shirt - 2 Pack', 
    rating: {
        stars: 3.5, 
        count: 77
    }, 
    price: 799
}, {
    image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster Black', 
    rating: {
        stars: 4,
        count: 2078
    },
    price: 1899
}]; */

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
            <select>
              <option selected value="1">1</option>
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

          <div class="added-to-cart">
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

document.querySelectorAll('.adding').forEach((button) => {
	button.addEventListener('click', () => {
		const pId = button.dataset.productId;
		const toFind = cart.find(prop => prop.id === pId);
		if(toFind)
			toFind.quantity++
		else {
			cart.push({
				id: pId,
				name: button.dataset.productName,
				quantity: 1
			});
		}

		let cartQuantity = 0;
		cart.forEach((product) => {
			cartQuantity += product.quantity;
		});
		document.querySelector('.cart-quantity').innerHTML = cartQuantity;
		console.clear();
		console.log(cart);
	});
});