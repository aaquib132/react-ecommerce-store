const USD_TO_INR = 92;

/**
 * Converts a price from USD to INR, rounds it to the nearest integer,
 * and formats it according to the Indian currency format.
 * @param {number} priceInUSD - The price in USD.
 * @returns {string} The formatted price in INR without decimals.
 */
export const formatPrice = (priceInUSD) => {
  return Math.round(priceInUSD * USD_TO_INR).toLocaleString("en-IN");
};

/**
 * Formats a given INR value to the Indian currency format without decimals.
 * @param {number} priceInINR - The price in INR.
 * @returns {string} The formatted price in INR without decimals.
 */
export const formatINR = (priceInINR) => {
  return Math.round(priceInINR).toLocaleString("en-IN");
};
