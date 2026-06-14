import Image from "next/image";
import { getContact, getDioceses } from "@/lib/api";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const schoolLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About School" },
  { href: "/#diocese", label: "Diocese" },
  { href: "/#vision", label: "Vision & Mission" },
  { href: "/#rules", label: "Rules & Regulations" },
];

const academicsLinks = [
  { href: "/#academics", label: "Programmes" },
  { href: "/activities", label: "Activities" },
  { href: "/achievements", label: "Achievements" },
  { href: "/#staff", label: "Staff" },
];

const contactLinks = [
  { href: "tel:04630273329", label: "04630-273329" },
  { href: "mailto:popemhsss@gmail.com", label: "popemhsss@gmail.com" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact Us" },
];

export default async function Footer() {
  const [contact, dioceses] = await Promise.all([getContact(), getDioceses()]);
  const items = contact?.length ? contact : [];
  const hasDiocese = dioceses && dioceses.length > 0;

  const phoneItem = items.find(i => i.icon === "Phone")?.value || "04630-273329";
  const emailItem = items.find(i => i.icon === "Mail")?.value || "popemhsss@gmail.com";

  const dynamicContactLinks = contactLinks.map(link => {
    if (link.href.startsWith("tel:")) {
      return { href: `tel:${phoneItem.replace(/[^0-9+]/g, "")}`, label: phoneItem };
    }
    if (link.href.startsWith("mailto:")) {
      return { href: `mailto:${emailItem}`, label: emailItem };
    }
    return link;
  });

  const dynamicSchoolLinks = schoolLinks.filter(link => {
    if (link.label === "Diocese" && !hasDiocese) return false;
    return true;
  });

  return (
    <footer className="bg-navy-dk px-[5%] pb-7 pt-15 text-white">
      <div className="mb-11 grid grid-cols-1 gap-11 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/logo.jpg"
            alt="Pope Memorial Logo"
            width={46}
            height={46}
            className="h-[46px] w-[46px] flex-shrink-0 rounded-full border-2 border-gold object-cover"
          />
          <div className="mt-3 text-[13.5px] font-semibold text-[#c5d5ef]">
            Pope Memorial Higher Secondary School
          </div>
          <p className="mt-3 text-[13px] leading-[1.75] text-[#6e88ac]">
            Educating students in Sawyerpuram, Thoothukudi since 1844 —
            grounded in faith, focused on learning, and committed to helping
            every student grow.
          </p>
          
        </div>

        <div>
          <h4 className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#6e88ac]">
            School
          </h4>
          <ul className="flex flex-col gap-2.5">
            {dynamicSchoolLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13.5px] text-[#a0b5d8] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#6e88ac]">
            Academics
          </h4>
          <ul className="flex flex-col gap-2.5">
            {academicsLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13.5px] text-[#a0b5d8] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#6e88ac]">
            Contact
          </h4>
          <ul className="flex flex-col gap-2.5">
            {dynamicContactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13.5px] text-[#a0b5d8] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-xs text-[#4e6a8c] sm:flex-row sm:items-center sm:justify-between">
        <span>
          © 2025 Pope Memorial Higher Secondary School, Sawyerpuram. All rights
          reserved.
        </span>
        <span>popememorialhss.org</span>
      </div>
    </footer>
  );
}
