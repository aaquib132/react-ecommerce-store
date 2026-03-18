const USD_TO_INR = 92;

/**
 * @param {number} priceInUSD
 * @returns {string} 
 */
export const formatPrice = (priceInUSD) => {
  return Math.round(priceInUSD * USD_TO_INR).toLocaleString("en-IN");
};

/**
 
 * @param {number} priceInINR 
 * @returns {string} 
 */
export const formatINR = (priceInINR) => {
  return Math.round(priceInINR).toLocaleString("en-IN");
};
