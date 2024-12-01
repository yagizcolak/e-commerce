import React, { createContext, useMemo, useState, useEffect } from "react";

/** Supported currency types */
export type Currency = "USD" | "EUR" | "TRY";

/** Shape of the CurrencyContext */
interface CurrencyContextType {
  /** Current selected currency */
  currency: Currency;
  /** Function to update the currency */
  setCurrency: (currency: Currency) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {
    throw new Error("setCurrency function must be overridden");
  },
});

/**
 * `CurrencyProvider` manages and provides currency state to its children.
 */
const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem("currency") as Currency;
    return savedCurrency || "USD";
  });

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
