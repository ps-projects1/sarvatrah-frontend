"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Adventure", href: "/adventure" },
    { name: "Activities", href: "/activities" },
    { name: "Holiday", href: "/holiday" },
    { name: "Pilgrimage", href: "/pilgrimage" },
  ];
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

        {/* Navigation */}
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
                {/* animation effect on hover, only for unselected ones */}
                {!isActive && (
                  <span className="absolute left-0 -bottom-1 h-0.5 bg-black/20 w-0 group-hover:w-full transition-all duration-300 ease-out origin-left"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Register / Sign In Button */}
        <button className="px-6 py-2.5 border border-clr text-clr rounded-full text-[14px] font-medium hover:bg-clr hover:text-white transition-colors cursor-pointer">
          Register / Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
