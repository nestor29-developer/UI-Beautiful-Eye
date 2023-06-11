const agentHas = (keyword: string) => {
  return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
};

export const isSafari = () => {
  return (
    typeof window !== "undefined" &&
    (!!(window as any).ApplePaySetupFeature || !!(window as any).safari) &&
    agentHas("Safari") &&
    !agentHas("Chrome") &&
    !agentHas("CriOS")
  );
};

export const getLocalStorage = (localDataKey: any) => {
  let localData = localStorage.getItem(localDataKey);
  localData = localData ? JSON.parse(localData) : localData;
  return localData;
};

export const setLocalStorage = (localDataKey: any, localDataValue: any) => {
  localStorage.setItem(localDataKey, JSON.stringify(localDataValue));
};

export const getTotalCarPurchaseProducts = (products: any[]) => {
  let items = 0;
  products.forEach((element: any) => {
    const amount = element?.amount ?? 0;
    if (amount > 0) {
      items += amount;
    }
  });
  return items;
};

export const getCurrencyFormat = (
  amount: any,
  locale: string,
  currency: string
) => {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
};
