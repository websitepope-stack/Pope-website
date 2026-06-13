import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { getContact } from "@/lib/api";
import ContactForm from "./ContactForm";

const ICONS = { MapPin, Phone, Mail, Globe, Clock };

function renderValue(item) {
  switch (item.icon) {
    case "Phone":
      return (
        <a href={`tel:${item.value.replace(/[^0-9+]/g, "")}`} className="text-[#1c1f2b] hover:text-navy">
          {item.value}
        </a>
      );
    case "Mail":
      return (
        <a href={`mailto:${item.value}`} className="text-[#1c1f2b] hover:text-navy">
          {item.value}
        </a>
      );
    case "Globe":
      return (
        <a
          href={`https://${item.value.replace(/^https?:\/\//, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1c1f2b] hover:text-navy"
        >
          {item.value}
        </a>
      );
    default:
      return <span>{item.value}</span>;
  }
}

export default async function Contact() {
  const contact = await getContact();
  const items = contact?.length ? contact : [];

  return (
    <section className="bg-cream px-[5%] py-20" id="contact">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
        <div data-aos="fade-right">
          <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
            Reach Us
          </p>
          <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
            Get in Touch
          </h2>
          <p className="mb-10 max-w-[480px] text-[15.5px] leading-[1.75] text-muted">
            We&apos;re happy to answer your questions about admissions, academics,
            or anything else about Pope Memorial HSS.
          </p>

          {items.map((item, index) => {
            const Icon = ICONS[item.icon] || Phone;
            return (
              <div
                key={item.id ?? item.label}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="mb-5.5 flex items-start gap-3.5"
              >
                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[10px] bg-navy-lt">
                  <Icon size={18} className="text-navy" />
                </div>
                <div>
                  <strong className="mb-0.5 block text-xs uppercase tracking-[0.06em] text-muted">
                    {item.label}
                  </strong>
                  <div className="text-[15px] text-[#1c1f2b]">{renderValue(item)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <ContactForm />
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-sm" data-aos="fade-up">
        <div className="border-b border-border bg-white px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-navy" />
            <span className="text-[13px] font-medium text-[#1c1f2b]">
              Pope Memorial Higher Secondary School — Sawyerpuram, Tamil Nadu
            </span>
          </div>
        </div>
        <iframe
          title="Pope Memorial HSS Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1972.0538345339814!2d78.0285377!3d8.6813104!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03f37aef3bdfdf%3A0x9a76b7af558c03e6!2sPope%20Memorial%20Higher%20Secondary%20School!5e0!3m2!1sen!2sin!4v1781347721645!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
