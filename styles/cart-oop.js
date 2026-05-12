export class CartOOP {

  constructor() {
    this.items = [];
  }

  add(productId) {
    const item = this.items.find(i => i.productId === productId);

    if (item) {
      item.quantity++;
    } else {
      this.items.push({
        productId,
        quantity: 1
      });
    }
  }

  remove(productId) {
    this.items = this.items.filter(i => i.productId !== productId);
  }

  update(productId, quantity) {
    const item = this.items.find(i => i.productId === productId);

    if (item) {
      item.quantity = quantity;
    }
  }

  getItems() {
    return this.items;
  }
}