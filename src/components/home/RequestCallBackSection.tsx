import { Send } from "lucide-react";
import Image from "next/image";
import React from "react";

const RequestCallBackSection = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px]">
      
      <Image
        src="/images/home/reqcallbackbg.png"
        fill
        alt="bg"
        className="object-cover opacity-20"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        
        <h2 className="text-clr font-roboto font-bold mb-4">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-normal block sm:inline">
            Contact{" "}
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl block sm:inline">
            Request Call Back or Email Inquiry
          </span>
        </h2>

        
        <p className="text-left text-sm sm:text-base md:text-lg mb-6 max-w-2xl">
          Need assistance? Request a call back or inquire via email for prompt
          support tailored to your requirements.
        </p>

        
        <div className="bg-white rounded-full w-full sm:w-[80%] md:w-[60%] lg:w-[40%] flex items-center px-4 py-2 shadow-lg">
          <input
            type="text"
            placeholder="Enter phone or email"
            className="flex-1 outline-none text-sm sm:text-base px-2"
          />
          <button className="bg-[#2789FF] p-2 sm:p-3 rounded-full text-white hover:bg-[#1a6fd4] shrink-0">
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCallBackSection;
