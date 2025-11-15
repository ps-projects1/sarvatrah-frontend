import React from "react";
import { Plus } from "lucide-react";

const EndOfDayCard = () => {
  return (
    <div className="bg-linear-to-r from-[#2789FF]/30  to-[#EE0405]/30  rounded-lg p-6 mb-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold font-roboto text-clr mb-1">
            End Of Day -
          </h4>
          <p className="text-sm font-roboto text-clr">
            Spend time at Leisure or add an activity to your day
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-[#2789FF] px-4 py-2.5 rounded-3xl font-roboto font-semibold hover:bg-blue-50 transition shadow-sm">
          <Plus size={18} />
          Add Activity To Day
        </button>
      </div>
    </div>
  );
};

export default EndOfDayCard;
