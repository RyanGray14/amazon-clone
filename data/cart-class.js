import { getProduct } from "../scripts/utils.js";
class Cart{
    cartItems;
    #key; 

    constructor(key){
        this.#key = key;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#key)) || 
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
    
    storeCart() {
        localStorage.setItem(this.#key, JSON.stringify(this.cartItems));
    }

    cartUpdate(elemId, quan) {
        const toFind = getProduct(this.cartItems, elemId);
        if(toFind)
            toFind.quantity += quan;
        else {
            this.cartItems.push({
                id: elemId,
                quantity: quan, 
                deliveryOptionId: '1'
            });
        }
        this.storeCart();
    }

    deleteItem(prodId) {
        const index = this.cartItems.findIndex(obj => obj.id === prodId)
        if(index >= 0)
            this.cartItems.splice(index, 1);
        this.storeCart();
    }

    updateIndvQuantity(id) {
        const item = getProduct(this.cartItems, id);
        item.quantity = +(document.querySelector(`.js-update-input-${id}`).value);
        document.querySelector(`.js-quantity-label-${id}`).innerHTML = item.quantity;
        this.storeCart();
    }

    updateDeliveryOption(pId, delOptionId) {
        const matchingItem = getProduct(this.cartItems, pId);
        matchingItem.deliveryOptionId = delOptionId;
        this.storeCart();
    }
}

const cart = new Cart('cart-oop');
const busCart = new Cart('cart-bus');

console.log(cart);
console.log(busCart);

