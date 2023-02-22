export const truncateAddress = (address: string) => {
  return `${address.slice(0, 9)}...${address.slice(-9)}`;
};

export const getCurrencyIcon = (underlying: string): { currency1: string; currency2: string } => {
  return {
    currency1: "/currency/" + underlying.split("/")[1].toLowerCase() + ".svg",
    currency2: "/currency/" + underlying.split("/")[0].toLowerCase() + ".svg"
  };
};
