"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "About",
    dropdown: [
      { href: "/#about", label: "Our Story" },
      { href: "/#diocese", label: "Diocese" },
      { href: "/#vision", label: "Vision & Mission" },
    ],
  },
  { href: "/#academics", label: "Academics" },
  {
    label: "School Life",
    dropdown: [
      { href: "/#highlights", label: "Highlights" },
      { href: "/activities", label: "Activities & Clubs" },
      { href: "/achievements", label: "Achievements" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  { href: "/#staff", label: "Staff" },
  { href: "/#rules", label: "Rules & Regs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex h-[70px] items-center justify-between border-b border-border bg-white px-[5%] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(27,58,107,0.1)]" : "shadow-none"
      }`}
    >
      <a href="/" className="flex items-center gap-3">
        <Image
          src="/logo.jpg"
          alt="Pope Memorial Logo"
          width={46}
          height={46}
          className="h-[46px] w-[46px] flex-shrink-0 rounded-full border-2 border-gold object-cover"
        />
        <div className="flex flex-col leading-tight">
          <strong className="text-[13.5px] font-semibold tracking-wide text-navy">
            Pope Memorial HSS
          </strong>
          <span className="text-[11px] text-muted">Sawyerpuram, Thoothukudi</span>
        </div>
      </a>

      <ul className="hidden items-center gap-1 lg:flex">
        {navLinks.map((link) =>
          link.dropdown ? (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium text-muted transition-colors hover:text-navy"
              >
                {link.label}
                <ChevronDown size={14} />
              </button>
              {openDropdown === link.label && (
                <div className="absolute left-0 top-full min-w-[200px] rounded-lg border border-border bg-white py-2 shadow-[0_8px_24px_rgba(27,58,107,0.12)]">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-[13.5px] text-muted transition-colors hover:bg-navy-lt hover:text-navy"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ) : (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-3 py-2 text-[13.5px] font-medium transition-colors hover:text-navy ${
                  link.href === "/" ? "text-navy" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          )
        )}
      </ul>

      <a
        href="/#contact"
        className="hidden rounded-md bg-navy px-5 py-[9px] text-[13.5px] font-medium text-white transition-colors hover:bg-navy-dk lg:inline-block"
      >
        Contact Us
      </a>

      <button
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="p-1 text-text lg:hidden"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute top-[70px] left-0 right-0 flex max-h-[calc(100vh-70px)] flex-col gap-1 overflow-y-auto border-b border-border bg-white px-[5%] py-4 shadow-lg lg:hidden">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  type="button"
                  onClick={() =>
                    setMobileDropdown((v) => (v === link.label ? null : link.label))
                  }
                  className="flex w-full items-center justify-between py-2 text-sm font-medium text-navy"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      mobileDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdown === link.label && (
                  <div className="flex flex-col gap-1 border-l border-border pl-4">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="py-1.5 text-sm text-muted"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-navy"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="/#contact"
            className="mt-2 rounded-md bg-navy px-5 py-2 text-center text-sm font-medium text-white"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
