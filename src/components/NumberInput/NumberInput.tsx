import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export interface CurrencyInputProps {
  value: number;
  onChange: (e: number) => void;
}

const CurrencyInput = ({ value, onChange }: CurrencyInputProps) => {
  return (
    <NumericFormat
      value={value}
      className="flex h-10 w-full min-w-96 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale={true}
      onValueChange={(e) => onChange(e.floatValue || 0)}
      prefix="R$"
      allowNegative={false}
      placeholder="R$ 0,00"
    />
  );
};

export default CurrencyInput;
