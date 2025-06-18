export function dateFormater(date) {
  const formattedDate = new Date(date);

  return formattedDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
