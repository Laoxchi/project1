import { cart, removeFromCart, updateQuantity } from './cart.js';
import { products } from './products.js';

renderCheckout();

function renderCheckout() {
  let checkoutHTML = '';
  let itemsTotalCents = 0;

  cart.forEach((cartItem) => {

    const product = products.find((p) => {
      return p.id === cartItem.productId;
    });

    if (!product) return;

    itemsTotalCents += product.priceCents * cartItem.quantity;

    checkoutHTML += `
      <div class="cart-item-container">

        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>

            <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity">
              <span>
                Quantity:
                <span class="quantity-label">${cartItem.quantity}</span>
              </span>

              <span class="update-quantity-link link-primary js-update"
                data-product-id="${product.id}">
                Update
              </span>

              <span class="delete-quantity-link link-primary js-delete"
                data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            <div class="delivery-option">
              <input type="radio" checked class="delivery-option-input" name="delivery-${product.id}">
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-${product.id}">
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-${product.id}">
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  });

  document.querySelector('.order-summary').innerHTML = checkoutHTML;

  renderPaymentSummary(itemsTotalCents);
  attachEvents();
}

function renderPaymentSummary(itemsTotalCents) {

  const shippingCents = 499;
  const totalBeforeTax = itemsTotalCents + shippingCents;
  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax + tax;

  document.querySelector('.payment-summary').innerHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.length}):</div>
      <div class="payment-summary-money">
        $${(itemsTotalCents / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-money">
        $${(shippingCents / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${(totalBeforeTax / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${(tax / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${(total / 100).toFixed(2)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
}

function attachEvents() {


  document.querySelectorAll('.js-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;

      removeFromCart(productId);
      renderCheckout();
    });
  });

  
  document.querySelectorAll('.js-update').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;

      const newQty = Number(prompt('Enter new quantity:'));

      if (newQty > 0) {
        updateQuantity(productId, newQty);
        renderCheckout();
      }
    });
  });

 
  const orderBtn = document.querySelector('.js-place-order');

  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      location.href = 'amazon.html';
    });
  }
}