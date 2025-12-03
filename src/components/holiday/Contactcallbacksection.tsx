"use client";
import { useState } from "react";

const ContactCallBackSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="relative  md:py-24 overflow-hidden">
      
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/holiday/contactImage.png')",
        }}
      />
      
      <div className="absolute inset-0 -z-10 bg-white/85" />

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="max-w-[700px] mx-auto text-center">
          
          <h2 className="text-[30px] md:text-[40px] font-light text-[#1E2125] mb-3">
            Contact{" "}
            <span className="font-semibold">
              Request Call Back or Email Inquiry
            </span>
          </h2>

          
          <p className="text-[16px] text-[#666666] mb-8 leading-relaxed">
            Need assistance? Request a call back or inquire via email for prompt
            support tailored to your requirements.
          </p>

          
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 max-w-[500px] mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Enter phone or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white border border-[#E6E6E6] rounded-full text-[16px] placeholder:text-[#999FA8] focus:outline-none focus:ring-2 focus:ring-[#2789FF] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-4 bg-[#2789FF] text-white rounded-full hover:bg-[#1a73e8] transition-colors flex items-center justify-center shrink-0"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCallBackSection;
