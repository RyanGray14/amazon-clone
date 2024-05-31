import { cart, deleteItem, updateIndvQuantity, updateDeliveryOption } from "../../data/cart.js";
import { updateQuantity } from "../checkout.js";
import { products } from "../../data/products.js";
import { getProduct, rounding } from "../utils.js";
import { deliveryOptions } from "../../data/delivery.js";
import { renderPaymentSummary } from "./PaymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
    let cartHTML = '';
    cart.forEach((cartItem) => {
        const matchingItem = getProduct(products, cartItem.id);		
       const date = dayjs().add(getProduct(deliveryOptions, cartItem.deliveryOptionId).time, 'days').format('dddd, MMMM D');
        cartHTML += `
        <div class="cart-item-container js-container-${matchingItem.id}">
            <div class="delivery-date js-delivery">
                Delivery date: ${date}
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
                            data-update-id = "${matchingItem.id}">
                            Update
                        </span>
                        <input class = "quantity-input js-update-input-${matchingItem.id}">
                        <span class="save-quantity-link js-save link-primary"
                            data-save-id = "${matchingItem.id}"> 
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
                    ${deliveryHtml(cartItem)}
                </div>
            </div>
        </div>`;	
    });
    document.querySelector('.js-order-summary').innerHTML = cartHTML;

    function deliveryHtml(Item) {
        let delHtml = '';
        deliveryOptions.forEach((option) => {
            const deliveryDate = dayjs().add(option.time, 'days').format('dddd, MMMM D' );
            const price = (option.priceCents) ? `$${option.priceCents / 100} -`: 'FREE';
            const isChecked = option.id === Item.deliveryOptionId;
            delHtml += `<div class="delivery-option js-delivery-options"
                data-p-id = "${Item.id}"
                data-del-id = "${option.id}">
                <input type="radio"
                    ${isChecked ? 'checked': ''}
                    class="delivery-option-input"
                    name="delivery-option-${Item.id}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                        ${price} Shipping 
                    </div>
                </div>
            </div>`
        });
        return delHtml;
    }

    document.querySelectorAll('.js-delete-button').forEach((remover) => {
        remover.addEventListener('click', () => {
            const id = remover.dataset.removeId;
            deleteItem(id);
            document.querySelector(`.js-container-${id}`).remove();		
            document.querySelector('.cart-checkout-quantity').innerHTML = `${updateQuantity()} 	items`;
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.update-quantity-link').forEach((updater) => {
        updater.addEventListener('click', () => {
            const id = updater.dataset.updateId;
            document.querySelector(`.js-container-${id}`).classList.add('is-editing');
    }); });
    document.querySelectorAll('.js-save').forEach((saver) => {
        saver.addEventListener('click', () => {
            const id = saver.dataset.saveId;
            updateIndvQuantity(id);
            document.querySelector(`.js-container-${id}`).classList.remove('is-editing');
            document.querySelector('.cart-checkout-quantity').innerHTML = `${updateQuantity()} 	items`;
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-options').forEach((element) => {
        element.addEventListener('click', () => {
            const {pId, delId} = element.dataset;
            updateDeliveryOption(pId, delId);
            updateQuantity();
            renderPaymentSummary();
            renderOrderSummary();
        });
    });
}
