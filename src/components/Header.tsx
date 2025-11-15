"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Adventure", href: "/adventure" },
    { name: "Activities", href: "/activities" },
    { name: "Holiday", href: "/holiday" },
    { name: "Pilgrimage", href: "/pilgrimage" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-[#E6E6E6]">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10">
            <Image
              src="/logo.svg"
              height={40}
              width={40}
              alt="Sarvatrah logo"
              className=""
            />
          </div>
          <span className="text-[18px] font-semibold text-clr">Sarvatrah</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative group text-[15px] transition-colors ${
                  isActive
                    ? "text-white bg-black px-4 py-2 rounded-full font-semibold"
                    : "text-clr hover:text-black/50"
                }`}
              >
                {item.name}
                {!isActive && (
                  <span className="absolute left-0 -bottom-1 h-0.5 bg-black/20 w-0 group-hover:w-full transition-all duration-300 ease-out origin-left"></span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* Register / Sign In Button */}
          <button className="px-6 py-2.5 border border-clr text-clr rounded-full text-[14px] font-medium hover:bg-clr hover:text-white transition-colors cursor-pointer">
            Register / Sign In
          </button>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop - Use button for proper accessibility */}
          <button
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            aria-label="Close mobile menu"
            type="button"
          />

          {/* Mobile Menu */}
          <nav className="md:hidden absolute top-full flex left-0 right-0 bg-white border-b border-[#E6E6E6] shadow-lg z-40 animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-[1400px] mx-auto px-6 items-center py-4 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`py-3 px-4 rounded-lg text-[15px] transition-colors ${
                      isActive
                        ? "text-white bg-black font-semibold"
                        : "text-clr hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
