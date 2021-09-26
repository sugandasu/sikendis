export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const fullMonth =
    date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const fullDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return date.getFullYear() + "-" + fullMonth + "-" + fullDate;
};
