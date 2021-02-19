export interface Products {
  id: number;
  price: number;
  title: string;
  description: string;
  categoryId: number;
  quantity: number;
}

export default function formatProductsToPaypal(products: Products[]) {
  let units = {
    amount: {
      currency_code: 'BRL',
      value: 0,
      breakdown: {
        item_total: {
          currency_code: 'BRL',
          value: 0,
        },
      },
    },
    items: [],
  };

  products.forEach((prod) => {
    const { price, title, id, quantity, description } = prod;

    units.amount.value += (price * quantity);
    units.amount.breakdown.item_total.value += (price * quantity);

    units.items.push({
      name: title,
      sku: id,
      unit_amount: {
        currency_code: 'BRL',
        value: price,
      },
      description,
      quantity,
    });
  });

  return units;
}
