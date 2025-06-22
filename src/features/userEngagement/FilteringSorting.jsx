import SelectOpt from "../../ui/SelectOpt";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "planned", label: "Planned" },
  { value: "inProgress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "onhold", label: "On Hold" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "feature", label: "Feature" },
  { value: "improvement", label: "Improvement" },
  { value: "bugFix", label: "Bug Fix" },
  { value: "integration", label: "Integration" },
];

const sortingOptions = [
  { value: "created_at", label: "Most Recent" },
  { value: "upvote_count", label: "Most Upvoted" },
];

const productOptions = [
  { value: "all", label: "All Products" },
  { value: "journeyBoard", label: "JourneyBoard" },
  { value: "worldWise", label: "WorldWise" },
];

function FilteringSorting({ filters, setFilters }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 px-4 py-4 bg-white text-black shadow-md rounded-t
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    md:px-8 md:py-4"
    >
      <SelectOpt
        label="Product:"
        options={productOptions}
        value={filters.productId}
        onChange={(e) =>
          setFilters((f) => ({ ...f, productId: e.target.value }))
        }
      />
      <SelectOpt
        label="Status:"
        options={statusOptions}
        value={filters.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
      />
      <SelectOpt
        label="Categories:"
        options={categoryOptions}
        value={filters.category}
        onChange={(e) =>
          setFilters((f) => ({ ...f, category: e.target.value }))
        }
      />
      <SelectOpt
        label="Sort by:"
        options={sortingOptions}
        value={filters.sortBy}
        onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
      />
    </div>
  );
}

export default FilteringSorting;
