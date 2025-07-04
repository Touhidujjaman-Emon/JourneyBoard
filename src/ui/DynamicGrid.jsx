import Cards from "./Cards";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function DynamicGrid({ filters }) {
  const [productData, setProductData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 6;

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

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error } = await query;
      if (error) console.error(error);
      else setProductData(data);
    }

    getItems();
  }, [filters, refreshFlag, page]);

  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    async function getCount() {
      let query = supabase
        .from("items")
        .select("id", { count: "exact", head: true });
      if (filters.productId !== "all")
        query = query.eq("productId", filters.productId);
      if (filters.status !== "all") query = query.eq("status", filters.status);
      if (filters.category !== "all")
        query = query.eq("categories", filters.category);
      const { count } = await query;
      setTotalCount(count || 0);
    }
    getCount();
  }, [filters, refreshFlag]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {productData.map((product, index) => (
          <Cards key={index} productData={product} refetchGrid={refetch} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pb-4 mt-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DynamicGrid;
