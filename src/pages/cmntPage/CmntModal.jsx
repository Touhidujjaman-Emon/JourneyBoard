import IconBtn from "../../ui/IconBtn";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../../ui/Button";

function CmntModal({ onClick }) {
  const [value, setValue] = useState("");
  const MaxChars = 300;
  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4 max-w-screen">
      <div className="flex flex-col  bg-white rounded-lg shadow-lg max-h-[80vh] h-full w-full  ">
        <div className="flex items-center justify-between p-8  border-b-2 border-gray-200">
          <h1 className="text-2xl font-bold">Comments</h1>
          <IconBtn onClick={onClick} className="h-6 w-6" icon={<XMarkIcon />} />
        </div>
        <div className="overflow-y-auto">
          <div className="p-8 ">
            <textarea
              maxLength={MaxChars}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-500 min-h-28 "
              placeholder="Write your comment here..."
            />
          </div>
          <div className="px-8 flex items-center justify-between">
            <div className="text-gray-500 text-sm">
              {value.length}/{MaxChars} characters
            </div>

            <Button
              children={"Submit Comment"}
              color="black"
              text="white"
              height="fit-content"
              width="fit-content"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CmntModal;
