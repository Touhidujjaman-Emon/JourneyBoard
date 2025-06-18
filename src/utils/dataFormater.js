import { dateFormater } from "./dateFormater";

export function dataFormater(data) {
  const formattedData = data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status,
    category: item.categories,
    productId: item.productId,
    date: dateFormater(item.created_at),
  }));

  return formattedData;
}
