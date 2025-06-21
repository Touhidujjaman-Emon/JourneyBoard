import IconBtn from "./IconBtn";
import CmntModal from "../pages/cmntPage/cmntModal";
import { useState } from "react";
import { useUpvotes } from "../services/upVote";
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpIcon as ArrowUpOutline } from "@heroicons/react/24/outline";
import { ArrowUpIcon as ArrowUpSolid } from "@heroicons/react/24/solid";

function Cards({ productData }) {
  const [showCmntModal, setShowCmntModal] = useState(false);
  const { count, hasUpvoted, loading, error, toggle } = useUpvotes(
    productData.id
  );

  return (
    <div className="bg-white shadow-md rounded p-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col justify-start">
          <h2 className="text-2xl font-semibold">{productData.title}</h2>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
            <span className="bg-gray-200 text-black px-2 py-1 rounded">
              {productData.category}
            </span>
            <span className="bg-gray-200 text-black px-2 py-1 rounded">
              {productData.status}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-lg">{productData.description}</p>
      </div>

      <div className="flex items-center justify-between mt-6 border-t pt-4 border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
          <span>{productData.date}</span>
        </div>

        <div className="flex items-center space-x-4">
          <IconBtn
            icon={
              <ChatBubbleBottomCenterIcon className="h-6 w-6 text-blue-500" />
            }
            onClick={() => setShowCmntModal(true)}
          />

          <IconBtn
            onClick={toggle}
            text={count}
            icon={
              hasUpvoted ? (
                <ArrowUpSolid className="h-6 w-6 text-green-500" />
              ) : (
                <ArrowUpOutline className="h-6 w-6 text-gray-500" />
              )
            }
            disabled={loading}
            className={`flex items-center space-x-1 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

      {showCmntModal && (
        <CmntModal display="block" onClick={() => setShowCmntModal(false)} />
      )}
    </div>
  );
}

export default Cards;
