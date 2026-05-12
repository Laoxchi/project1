class Cart {

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  add(productId) {
    const item = this.cart.find(i => i.productId === productId);

    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({
        productId,
        quantity: 1
      });
    }

    this.save();
  }

  remove(productId) {
    this.cart = this.cart.filter(i => i.productId !== productId);
    this.save();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(i => i.productId === productId);

    if (item) {
      item.quantity = quantity;
      this.save();
    }
  }

  getCart() {
    return this.cart;
  }

  clear() {
    this.cart = [];
    this.save();
  }

  getTotalQuantity() {
    let total = 0;

    this.cart.forEach(item => {
      total += item.quantity;
    });

    return total;
  }
}

const cart = new Cart();

export default cart;