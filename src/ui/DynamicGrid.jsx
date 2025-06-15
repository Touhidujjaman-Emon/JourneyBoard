function DynamicGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-4">
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold">Card 1</h2>
        <p className="text-gray-600">This is the content of card 1.</p>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold">Card 2</h2>
        <p className="text-gray-600">This is the content of card 2.</p>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold">Card 3</h2>
        <p className="text-gray-600">This is the content of card 3.</p>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold">Card 4</h2>
        <p className="text-gray-600">This is the content of card 4.</p>
      </div>
    </div>
  );
}

export default DynamicGrid;
