export const getTodayPageId = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const formattedDate = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${formattedDate}`
}

export const formatDate = (currentIDdate) => {
  const year = currentIDdate.substring(0, 4);
  const month = currentIDdate.substring(4, 6);
  const day = currentIDdate.substring(6, 8);
  return `${day}-${month}-${year}`;
}