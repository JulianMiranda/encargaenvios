export const discount = (price: number, priceDiscount: number): number => {
  if (priceDiscount && priceDiscount !== 0) {
    return priceDiscount;
  } else {
    return price;
  }
};
