import Cards from "./Cards";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function DynamicGrid({ filters }) {
  const [productData, setProductData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const refetch = () => setRefreshFlag((f) => f + 1);

  useEffect(() => {
    async function getItems() {
      let query = supabase
        .from("items")
        .select(
          "id, title, description, status, categories, productId, upvote_count, created_at"
        );

      if (filters.productId !== "all")
        query = query.eq("productId", filters.productId);

      if (filters.status !== "all") query = query.eq("status", filters.status);

      if (filters.category !== "all")
        query = query.eq("categories", filters.category);

      query = query.order(filters.sortBy, { ascending: filters.ascending });

      const { data, error } = await query;
      if (error) console.error(error);
      else setProductData(data);
    }

    getItems();
  }, [filters, refreshFlag]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {productData.map((product, index) => (
        <Cards key={index} productData={product} refetchGrid={refetch} />
      ))}
    </div>
  );
}

export default DynamicGrid;
