import Filtering from "../../features/userEngagement/FilteringSorting";
import DynamicGrid from "../../ui/DynamicGrid";
import NavBar from "../../ui/NavBar";

function HomePage() {
  return (
    <div className="bg-white flex flex-col min-h-screen max-w-7xl w-full border border-gray-200 rounded">
      <NavBar />
      <Filtering />
      <DynamicGrid />
    </div>
  );
}

export default HomePage;
