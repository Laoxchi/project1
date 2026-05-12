export function formatMoney(cents) {
  return (cents / 100).toFixed(2);
}

// Add two money values
export function addMoney(aCents, bCents) {
  return aCents + bCents;
}

// Calculate tax
export function calculateTax(amountCents, taxRate = 0.1) {
  return amountCents * taxRate;
}

export function calculateTotal(itemsTotalCents, shippingCents, taxRate = 0.1) {
  const totalBeforeTax = itemsTotalCents + shippingCents;
  const tax = calculateTax(totalBeforeTax, taxRate);
  const total = totalBeforeTax + tax;

  return {
    totalBeforeTax,
    tax,
    total
  };
}

export function displayMoney(cents, symbol = "$") {
  return `${symbol}${formatMoney(cents)}`;
}