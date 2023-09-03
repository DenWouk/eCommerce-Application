export default function formatDate(date: Date | null) {
  if (!date) {
    return undefined;
  }
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (+month < 10) month = `0${month}`;
  if (+day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
}

export function convertFormatDate(date: string) {
  const [year, month, day] = date.split('-');
  return `${month}-${day}-${year}`;
}
