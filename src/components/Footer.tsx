import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative">
      <footer className="bg-[#E8E8E8] pt-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_0.9fr_0.7fr_1.2fr] gap-8 lg:gap-4 mb-8">
            {/* First Column - Brand & Address */}
            <div className="space-y-6">
              {/* Logo & Brand Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12">
                  <Image
                    src="/logo.svg"
                    height={48}
                    width={48}
                    alt="Sarvatrah logo"
                  />
                </div>
                <span className="text-[22px] font-bold text-clr">
                  Sarvatrah
                </span>
              </div>

              {/* Address Section */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#999FA8] mt-1 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-[14px] leading-relaxed text-clr">
                    <p>Opposite Gyuto Monastery Gate,</p>
                    <p>Sidhbari Dharamshala - 176057,</p>
                    <p>Himachal Pradesh, India.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Column - Call Us & Email Us */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-[#999FA8]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-[15px] font-semibold text-clr">
                    Call Us
                  </span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="tel:+919999345782"
                    className="block text-[15px] font-semibold text-[#2789FF] hover:text-[#1a73e8] transition-colors"
                  >
                    +91 999 934 5782
                  </Link>
                  <Link
                    href="tel:+919811045962"
                    className="block text-[15px] font-semibold text-[#2789FF] hover:text-[#1a73e8] transition-colors"
                  >
                    +91 981 104 5962
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-[#999FA8]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-[15px] font-semibold text-clr">
                    Email Us
                  </span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="mailto:sales@sarvatrah.com"
                    className="block text-[14px] font-medium text-[#2789FF] hover:text-[#1a73e8] transition-colors break-all"
                  >
                    sales@sarvatrah.com
                  </Link>
                  <Link
                    href="mailto:sourabh@sarvatrah.com"
                    className="block text-[14px] font-medium text-[#2789FF] hover:text-[#1a73e8] transition-colors break-all"
                  >
                    sourabh@sarvatrah.com
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-[15px] text-clr hover:text-[#2789FF] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/adventure"
                className="text-[15px] text-clr hover:text-[#2789FF] transition-colors font-medium"
              >
                Adventure
              </Link>
              <Link
                href="/activities"
                className="text-[15px] text-clr hover:text-[#2789FF] transition-colors font-medium"
              >
                Activities
              </Link>
              <Link
                href="/holiday"
                className="text-[15px] text-clr hover:text-[#2789FF] transition-colors font-medium"
              >
                Holiday
              </Link>
              <Link
                href="/pilgrimage"
                className="text-[15px] text-clr hover:text-[#2789FF] transition-colors font-medium"
              >
                Pilgrimage
              </Link>
              <Link
                href="/contact"
                className="text-[15px] text-clr hover:text-[#2789FF] transition-colors font-medium"
              >
                Contact
              </Link>
            </div>

            <div className="relative -mt-24 lg:-mt-32">
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] px-10 py-7 w-full ml-auto">
                <h3 className="text-[18px] font-semibold text-clr mb-5">
                  Send a <span className="font-bold">Message</span>
                </h3>

                <form className="space-y-3.5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E6E6E6] rounded-lg text-[13px] placeholder:text-[#999FA8] focus:outline-none focus:ring-2 focus:ring-[#2789FF] focus:border-transparent"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E6E6E6] rounded-lg text-[13px] placeholder:text-[#999FA8] focus:outline-none focus:ring-2 focus:ring-[#2789FF] focus:border-transparent"
                    />
                  </div>

                  {/* Subject */}
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E6E6E6] rounded-lg text-[13px] placeholder:text-[#999FA8] focus:outline-none focus:ring-2 focus:ring-[#2789FF] focus:border-transparent"
                  />

                  {/* Message */}
                  <textarea
                    placeholder="Message"
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E6E6E6] rounded-lg text-[13px] placeholder:text-[#999FA8] focus:outline-none focus:ring-2 focus:ring-[#2789FF] focus:border-transparent resize-none"
                  />
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-white border-2 border-clr text-clr rounded-full font-semibold text-[13px] hover:bg-clr hover:text-white transition-all duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex justify-end items-center py-4">
                <div className="flex gap-6 w-full">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-black/50 transition-colors"
                  >
                    <FaFacebookF size={18} />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-black/50 transition-colors"
                  >
                    <FaTwitter size={18} />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-black/50 transition-colors"
                  >
                    <FaInstagram size={18} />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-black/50 transition-colors"
                  >
                    <p className="m-0">
                      © {new Date().getFullYear()} Sarvatrah. All rights
                      reserved.
                    </p>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center bg-white text-[13px] text-[#81878E] gap-4 pb-4">
        <p className="m-0">© 2023 Sarvatrah. All rights reserved.</p>

        <div className="flex gap-8">
          <Link
            href="/privacy-policy"
            className="text-[#81878E] hover:text-clr transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-conditions"
            className="text-[#81878E] hover:text-clr transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/sitemap"
            className="text-[#81878E] hover:text-clr transition-colors"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
