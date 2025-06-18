import Cards from "./Cards";
import { getRoadmapItems } from "../services/getRoadmapItems";
import { useEffect, useState } from "react";
import { dataFormater } from "../utils/dataFormater";

// const productData = [
//   {
//     id: "jorneyBoard",
//     title: "Product 1",
//     category: "improvement",
//     status: "planned",
//     description: "This is a brief description of Product 1.",
//     date: "2023-10-01",
//   },
//   {
//     id: "jorneyBoard",
//     title: "Product 2",
//     category: "improvement",
//     status: "completed",
//     description: "This is a brief description of Product 2.",
//     date: "2023-10-02",
//   },
//   {
//     id: "jorneyBoard",
//     title: "Product 3",
//     category: "Category C",
//     status: "Available",
//     description: "This is a brief description of Product 3.",
//     date: "2023-10-03",
//   },
//   {
//     id: "jorneyBoard",
//     title: "Product 3",
//     category: "Category C",
//     status: "Available",
//     description: "This is a brief description of Product 3.",
//     date: "2023-10-03",
//   },
//   {
//     id: "jorneyBoard",
//     title: "Product 3",
//     category: "Category C",
//     status: "Available",
//     description: "This is a brief description of Product 3  .",
//     date: "2023-10-03",
//   },
// ];

function DynamicGrid() {
  const [productData, setProductData] = useState([]);
  useEffect(function () {
    async function getItems() {
      const data = await getRoadmapItems();
      const formattedData = dataFormater(data);
      setProductData(formattedData);
    }

    getItems();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-4">
      {productData.map((product, index) => (
        <Cards key={index} productData={product} />
      ))}
    </div>
  );
}

export default DynamicGrid;
