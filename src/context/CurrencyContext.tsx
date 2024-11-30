import React, { createContext, useMemo, useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'TRY';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {
    throw new Error('setCurrency function must be overridden');
  },
});

const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency;
    return savedCurrency || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;