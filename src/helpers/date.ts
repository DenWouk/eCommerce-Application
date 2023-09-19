export default function formatDate(date: Date) {
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (+month < 10) month = `0${month}`;
  if (+day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
}
