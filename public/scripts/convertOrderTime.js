const getHumanDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const humanDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return humanDate;
};