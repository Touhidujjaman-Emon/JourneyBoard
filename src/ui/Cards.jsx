import IconBtn from "./IconBtn";
import CmntModal from "../pages/cmntPage/cmntModal";
import { useState } from "react";
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

function Cards({ productData }) {
  const [showCmntModal, setShowCmntModal] = useState(false);
  return (
    <div className="bg-white shadow-md rounded p-4 h-full flex flex-col  justify-between">
      <div>
        <div className="flex  flex-col  justify-start">
          <h2 className="text-2xl font-semibold">{productData.title}</h2>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
            <span className="bg-gray-400 text-black px-2 py-1 rounded">
              {productData.category}
            </span>
            <span className="bg-gray-400 text-black px-2 py-1 rounded">
              {productData.status}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-wrap mt-4 text-lg">
          {productData.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6 border-t pt-4 border-gray-200">
        <div className="text-sm text-gray-600 space-x-2 flex items-center">
          <CalendarDaysIcon className="h-6 w-6 text-blue-500" />{" "}
          <span> {productData.date}</span>
        </div>
        <div className="flex  items-center space-x-8">
          <IconBtn
            icon={
              <ChatBubbleBottomCenterIcon className="h-6 w-6 text-blue-500" />
            }
            className="mt-2"
            onClick={() => setShowCmntModal(true)}
          />
          <IconBtn
            icon={<ArrowUpIcon className="h-6 w-6 text-green-500" />}
            className="mt-2"
          />
        </div>
      </div>
      {showCmntModal && (
        <CmntModal display="block" onClick={() => setShowCmntModal(false)} />
      )}
    </div>
  );
}

export default Cards;
