export const discountGalore = (
  priceGalore: number,
  priceGaloreDiscount: number = 0,
): number => {
  if (priceGaloreDiscount && priceGaloreDiscount !== 0) {
    return priceGaloreDiscount;
  } else {
    return priceGalore;
  }
};
