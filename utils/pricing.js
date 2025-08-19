export function calcTotalPrice(startDate, endDate, pricePerDay) {
  const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24));
  return days * pricePerDay;
}
