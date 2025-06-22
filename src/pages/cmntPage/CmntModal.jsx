import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentSection from "../../ui/CommentSection";

function CmntModal({ onClick, itemId }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 max-w-screen">
      <div className="flex flex-col bg-white rounded-lg shadow-lg max-h-full  sm:max-h-[80vh] w-full md:w-3/4 lg:w-1/2">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
          <h1 className="text-2xl font-bold">Comments</h1>

          <XMarkIcon onClick={onClick} className="h-6 w-6 cursor-pointer" />
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <CommentSection itemId={itemId} />
        </div>
      </div>
    </div>
  );
}

export default CmntModal;
