export const formatMoney = (number = 0) => {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}