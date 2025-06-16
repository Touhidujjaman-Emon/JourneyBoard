import { useState } from "react";
import SelectOpt from "../../ui/SelectOpt";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "planned", label: "Planned" },
  { value: "inprogress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "onhold", label: "On Hold" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "feature", label: "Feature" },
  { value: "improvement", label: "Improvement" },
  { value: "bugfix", label: "Bug Fix" },
  { value: "integration", label: "Integration" },
];

const sortingOptions = [
  { value: "all", label: "All" },
  { value: "mostRecent", label: "Most Recent" },
  { value: "mostUpvoted", label: "Most Upvote" },
];

const productOptions = [
  { value: "journeyBoard", label: "JourneyBoard" },
  { value: "worldWise", label: "WorldWise" },
];

function FilteringSorting() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [selectedCategories, setSelectedCategories] = useState("all");

  const [selectedSorting, setSelectedSorting] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("JourneyBoard");

  return (
    <div className="flex items-center justify-between mt-8  space-x-4 px-8 py-4 bg-white text-black shadow-md rounded-t">
      <SelectOpt
        label={"Product :"}
        options={productOptions}
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      />

      <SelectOpt
        label={"Status :"}
        options={statusOptions}
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      />

      <SelectOpt
        label={"Categories :"}
        options={categoryOptions}
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(e.target.value)}
      />

      <SelectOpt
        label={"Sort by :"}
        options={sortingOptions}
        value={selectedSorting}
        onChange={(e) => setSelectedSorting(e.target.value)}
      />
    </div>
  );
}

export default FilteringSorting;
