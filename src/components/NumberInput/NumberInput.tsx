import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export interface CurrencyInputProps {
  value: number;
  onChange: (e: number) => void;
}

const CurrencyInput = ({ value }: CurrencyInputProps) => {
  return (
    <NumericFormat
      value={value}
      className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale={true}
      prefix="R$"
      allowNegative={false}
      placeholder="R$ 0,00"
    />
  );
};

export default CurrencyInput;
