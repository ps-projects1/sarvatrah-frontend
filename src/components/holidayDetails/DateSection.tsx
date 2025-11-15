import React, { useState } from "react";
import { Share2, Download } from "lucide-react";

interface DateSectionProps {
  totalDays: number;
}

const generateDates = (numDays: number) => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const formatted = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      weekday: "short",
    });

    dates.push(formatted);
  }

  return dates;
};

const DateSection = ({ totalDays }: DateSectionProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const dates = generateDates(totalDays);

  return (
    <div className="bg-[#F1F7FF] w-full px-3 sm:px-4 lg:px-6 py-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <h3 className="font-roboto font-semibold text-base sm:text-lg">
          {totalDays} Day Plan:
        </h3>

        <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0 w-full sm:w-auto">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-3 sm:px-5 py-1 sm:py-1.5 rounded-full border-2 font-medium transition-all duration-200 cursor-pointer whitespace-nowrap text-xs sm:text-sm shrink-0 ${
                selectedDate === date
                  ? "text-[#2789FF] border-[#2789FF]"
                  : "text-[#1E212540] border-[rgba(30, 33, 37, 0.25)]"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end sm:justify-start">
        <div className="hidden sm:block h-8 w-0.5 bg-gray-300"></div>
        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2789FF] flex items-center justify-center text-white hover:bg-blue-600 transition">
          <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2789FF] flex items-center justify-center text-white hover:bg-blue-600 transition">
          <Download size={18} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default DateSection;
