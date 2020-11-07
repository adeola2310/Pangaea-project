/**
 * formats currency
 */

const formatCurrency = (price, currency) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formatter.format(price);
}

export default formatCurrency;