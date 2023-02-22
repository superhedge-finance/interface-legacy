export const truncateAddress = (address: string, digits: number = 8) => {
  return `${address.slice(0, digits + 2)}...${address.slice(-digits)}`;
};

export const getCurrencyIcon = (underlying: string): { currency1: string; currency2: string } => {
  if (underlying) {
    return {
      currency1: "/currency/" + underlying.split("/")[1].toLowerCase() + ".svg",
      currency2: "/currency/" + underlying.split("/")[0].toLowerCase() + ".svg"
    };
  }
  return {
    currency1: "/currency/eth.svg",
    currency2: "/currency/usdc.svg"
  };
};
