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

export const formatStrikePrice = (strikePrice: number) => {
  if (strikePrice > 0) return strikePrice.toLocaleString();
  return "NA";
};

export const formatDuration = (duration: number) => {
  if (duration > 0) {
    const days = Math.floor(duration / 3600 / 24);
    const hours = Math.floor((duration - (days * 3600 * 24)) / 3600);
    const minutes = Math.floor((duration - (days * 3600 * 24) - (hours * 3600)) / 60);
    return `${days}D : ${hours}H : ${minutes}M`;
  }
  return "0D : 0H : 0M";
};
