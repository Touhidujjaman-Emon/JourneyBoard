import Filtering from "../../features/userEngagement/FilteringSorting";
import DynamicGrid from "../../ui/DynamicGrid";
import NavBar from "../../ui/NavBar";
import { useState } from "react";

function HomePage() {
  const [filters, setFilters] = useState({
    productId: "all",
    status: "all",
    category: "all",
    sortBy: "created_at",
    ascending: false,
  });

  return (
    <div className="bg-white  flex flex-col min-h-screen max-w-7xl w-full border border-gray-200 rounded">
      <NavBar />
      <Filtering filters={filters} setFilters={setFilters} />
      <DynamicGrid filters={filters} />
    </div>
  );
}

export default HomePage;
