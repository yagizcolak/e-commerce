import React, { FC } from "react";
import styles from "./CurrencySelector.module.scss";

interface CurrencySelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const currencies = [
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
  { value: "TRY", label: "₺ TRY" },
];

const CurrencySelector: FC<CurrencySelectorProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.currencySelectorWrapper}>
      <select
        value={value}
        onChange={onChange}
        className={styles.currencySelector}
        {...props}
        data-testid="currency-selector"
      >
        {currencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.arrow} />
    </div>
  );
};

export default CurrencySelector;