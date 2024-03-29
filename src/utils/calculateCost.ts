import {Prices} from '../interfaces/Prices.interface';

export const getShippingPrice = (weight: number, prices: Prices) => {
  type WeightLimit = {
    upperLimit: number;
    priceKey: keyof Prices;
  };
  const weightLimits: WeightLimit[] = [
    {upperLimit: 1500, priceKey: 'oneandhalfkgPrice'},
    {upperLimit: 2000, priceKey: 'twokgPrice'},
    {upperLimit: 3000, priceKey: 'threekgPrice'},
    {upperLimit: 4000, priceKey: 'fourkgPrice'},
    {upperLimit: 5000, priceKey: 'fivekgPrice'},
    {upperLimit: 6000, priceKey: 'sixkgPrice'},
    {upperLimit: 7000, priceKey: 'sevenkgPrice'},
    {upperLimit: 8000, priceKey: 'eightkgPrice'},
    {upperLimit: 9000, priceKey: 'ninekgPrice'},
    {upperLimit: 10000, priceKey: 'tenkgPrice'},
    {upperLimit: 11000, priceKey: 'elevenkgPrice'},
    {upperLimit: 12000, priceKey: 'twelvekgPrice'},
    {upperLimit: 13000, priceKey: 'thirteenkgPrice'},
    {upperLimit: 14000, priceKey: 'fourteenkgPrice'},
    {upperLimit: 15000, priceKey: 'fifteenkgPrice'},
    {upperLimit: 16000, priceKey: 'sixteenkgPrice'},
    {upperLimit: 17000, priceKey: 'seventeenkgPrice'},
    {upperLimit: 18000, priceKey: 'eighteenkgPrice'},
    {upperLimit: 19000, priceKey: 'nineteenkgPrice'},
    {upperLimit: 20000, priceKey: 'twentykgPrice'},

    {upperLimit: 21000, priceKey: 'twentyonekgPrice'},
    {upperLimit: 22000, priceKey: 'twentytwokgPrice'},
    {upperLimit: 23000, priceKey: 'twentythreekgPrice'},
    {upperLimit: 24000, priceKey: 'twentyfourkgPrice'},
    {upperLimit: 25000, priceKey: 'twentyfivekgPrice'},
    {upperLimit: 26000, priceKey: 'twentysixkgPrice'},
    {upperLimit: 27000, priceKey: 'twentysevenkgPrice'},
    {upperLimit: 28000, priceKey: 'twentyeightkgPrice'},
    {upperLimit: 29000, priceKey: 'twentyninekgPrice'},
    {upperLimit: 30000, priceKey: 'thirtykgPrice'},

    {upperLimit: 31000, priceKey: 'thirtyonekgPrice'},
    {upperLimit: 32000, priceKey: 'thirtytwokgPrice'},
    {upperLimit: 33000, priceKey: 'thirtythreekgPrice'},
    {upperLimit: 34000, priceKey: 'thirtyfourkgPrice'},
    {upperLimit: 35000, priceKey: 'thirtyfivekgPrice'},
    {upperLimit: 36000, priceKey: 'thirtysixkgPrice'},
    {upperLimit: 37000, priceKey: 'thirtysevenkgPrice'},
    {upperLimit: 38000, priceKey: 'thirtyeightkgPrice'},
    {upperLimit: 39000, priceKey: 'thirtyninekgPrice'},

    {upperLimit: 40000, priceKey: 'fortykgPrice'},
    {upperLimit: 41000, priceKey: 'fortyonekgPrice'},
    {upperLimit: 42000, priceKey: 'fortytwokgPrice'},
    {upperLimit: 43000, priceKey: 'fortythreekgPrice'},
    {upperLimit: 44000, priceKey: 'fortyfourkgPrice'},
    {upperLimit: 45000, priceKey: 'fortyfivekgPrice'},
    {upperLimit: 46000, priceKey: 'fortysixkgPrice'},
    {upperLimit: 47000, priceKey: 'fortysevenkgPrice'},
    {upperLimit: 48000, priceKey: 'fortyeightkgPrice'},
    {upperLimit: 49000, priceKey: 'fortyninekgPrice'},

    {upperLimit: 50000, priceKey: 'fiftykgPrice'},
    {upperLimit: 51000, priceKey: 'fiftyonekgPrice'},
    {upperLimit: 52000, priceKey: 'fiftytwokgPrice'},
    {upperLimit: 53000, priceKey: 'fiftythreekgPrice'},
    {upperLimit: 54000, priceKey: 'fiftyfourkgPrice'},
    {upperLimit: 55000, priceKey: 'fiftyfivekgPrice'},
    {upperLimit: 56000, priceKey: 'fiftysixkgPrice'},
    {upperLimit: 57000, priceKey: 'fiftysevenkgPrice'},
    {upperLimit: 58000, priceKey: 'fiftyeightkgPrice'},
    {upperLimit: 59000, priceKey: 'fiftyninekgPrice'},

    {upperLimit: 60000, priceKey: 'sixtykgPrice'},
    {upperLimit: 61000, priceKey: 'sixtyonekgPrice'},
    {upperLimit: 62000, priceKey: 'sixtytwokgPrice'},
    {upperLimit: 63000, priceKey: 'sixtythreekgPrice'},
    {upperLimit: 64000, priceKey: 'sixtyfourkgPrice'},
    {upperLimit: 65000, priceKey: 'sixtyfivekgPrice'},
    {upperLimit: 66000, priceKey: 'sixtysixkgPrice'},
    {upperLimit: 67000, priceKey: 'sixtysevenkgPrice'},
    {upperLimit: 68000, priceKey: 'sixtyeightkgPrice'},
    {upperLimit: 69000, priceKey: 'sixtyninekgPrice'},

    {upperLimit: 70000, priceKey: 'seventykgPrice'},
    {upperLimit: 71000, priceKey: 'seventyonekgPrice'},
    {upperLimit: 72000, priceKey: 'seventytwokgPrice'},
    {upperLimit: 73000, priceKey: 'seventythreekgPrice'},
    {upperLimit: 74000, priceKey: 'seventyfourkgPrice'},
    {upperLimit: 75000, priceKey: 'seventyfivekgPrice'},
    {upperLimit: 76000, priceKey: 'seventysixkgPrice'},
    {upperLimit: 77000, priceKey: 'seventysevenkgPrice'},
    {upperLimit: 78000, priceKey: 'seventyeightkgPrice'},
    {upperLimit: 79000, priceKey: 'seventyninekgPrice'},

    {upperLimit: 80000, priceKey: 'eightykgPrice'},
    {upperLimit: 81000, priceKey: 'eightyonekgPrice'},
    {upperLimit: 82000, priceKey: 'eightytwokgPrice'},
    {upperLimit: 83000, priceKey: 'eightythreekgPrice'},
    {upperLimit: 84000, priceKey: 'eightyfourkgPrice'},
    {upperLimit: 85000, priceKey: 'eightyfivekgPrice'},
    {upperLimit: 86000, priceKey: 'eightysixkgPrice'},
    {upperLimit: 87000, priceKey: 'eightysevenkgPrice'},
    {upperLimit: 88000, priceKey: 'eightyeightkgPrice'},
    {upperLimit: 89000, priceKey: 'eightyninekgPrice'},

    {upperLimit: 90000, priceKey: 'ninetykgPrice'},
    {upperLimit: 91000, priceKey: 'ninetyonekgPrice'},
    {upperLimit: 92000, priceKey: 'ninetytwokgPrice'},
    {upperLimit: 93000, priceKey: 'ninetythreekgPrice'},
    {upperLimit: 94000, priceKey: 'ninetyfourkgPrice'},
    {upperLimit: 95000, priceKey: 'ninetyfivekgPrice'},
    {upperLimit: 96000, priceKey: 'ninetysixkgPrice'},
    {upperLimit: 97000, priceKey: 'ninetysevenkgPrice'},
    {upperLimit: 98000, priceKey: 'ninetyeightkgPrice'},
    {upperLimit: 99000, priceKey: 'ninetyninekgPrice'},
    {upperLimit: 100000, priceKey: 'onehundredkgPrice'},
  ];

  for (const limit of weightLimits) {
    if (weight <= limit.upperLimit) {
      return prices[limit.priceKey];
    }
  }
  return 'Precio no encontrado para este peso';
};

export const calcularCombo = ({
  pesoTotal,
  prices,
  costoTotal,
}: {
  pesoTotal: number;
  costoTotal: number;
  prices: Prices;
}) => {
  if (pesoTotal === 0) {
    return 0;
  }
  const resp = getShippingPrice(pesoTotal, prices);

  if (typeof resp !== 'number') {
    return 0;
  } else {
    return (costoTotal + resp) * 1.4;
  }
};
