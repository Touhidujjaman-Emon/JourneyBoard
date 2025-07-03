import { useState, useEffect } from "react";
import { useUpvotes } from "../services/upVote";
import { dateFormater } from "../utils/dateFormater";
import getTotalCommentCount from "../utils/getTotalCommentCount";

import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpIcon as ArrowUpOutline } from "@heroicons/react/24/outline";
import { ArrowUpIcon as ArrowUpSolid } from "@heroicons/react/24/solid";

import IconBtn from "./IconBtn";
import CmntModal from "../pages/cmntPage/CmntModal.jsx";

function Cards({ productData, refetchGrid }) {
  const [showCmntModal, setShowCmntModal] = useState(false);
  const { count, hasUpvoted, loading, error, toggle } = useUpvotes(
    productData.id
  );
  const formattedDate = dateFormater(productData.created_at);

  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function fetchAndCount() {
      const { fetchComments } = await import("../services/commentHelper");
      const { buildCommentTree } = await import("../utils/buildCommentTree");
      const { data, error } = await fetchComments(productData.id);
      if (!error && data) {
        const tree = buildCommentTree(data);
        setCommentCount(getTotalCommentCount(tree));
      }
    }
    fetchAndCount();
  }, [productData.id, showCmntModal]);

  // Wrap toggle to also refetch grid after upvote
  const handleUpvote = async () => {
    await toggle();
    if (typeof refetchGrid === "function") refetchGrid();
  };

  return (
    <div className="bg-white shadow-md rounded p-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col justify-start">
          <h2 className="text-2xl font-semibold">{productData.title}</h2>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
            <span className="bg-gray-200 text-black px-2 py-1 rounded">
              {productData.categories}
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
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center space-x-4">
          <IconBtn
            icon={
              <>
                <ChatBubbleBottomCenterIcon className="h-6 w-6 text-blue-500" />
                <span className="ml-1 text-gray-600 font-semibold">
                  {commentCount}
                </span>
              </>
            }
            onClick={() => setShowCmntModal(true)}
          />

          <IconBtn
            onClick={handleUpvote}
            icon={
              hasUpvoted ? (
                <>
                  <ArrowUpSolid className="h-6 w-6 text-green-500 " />
                  <span className="ml-1 text-gray-600 font-semibold">
                    {count}
                  </span>
                </>
              ) : (
                <>
                  <ArrowUpOutline className="h-6 w-6 text-gray-500 " />
                  <span className="ml-1 text-gray-600 font-semibold">
                    {count}
                  </span>
                </>
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
        <CmntModal
          itemId={productData.id}
          onClick={() => setShowCmntModal(false)}
        />
      )}
    </div>
  );
}

export default Cards;
