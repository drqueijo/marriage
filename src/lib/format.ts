const format = {
  money: (value: number) =>
    Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100),
};
export default format;
