export const formatCurrency = (amount: number): string => {
  const formattedAmount = amount.toFixed(2);
  const decimalSeparator = ",";
  const [integerPart, decimalPart] = formattedAmount.split(".");

  const integerWithSeparator = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  return `$ ${integerWithSeparator}${decimalSeparator}${decimalPart} `;
};
