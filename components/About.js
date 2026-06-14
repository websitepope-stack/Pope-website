import Image from "next/image";
import { BookOpen, Church, Sprout, HeartHandshake, Phone } from "lucide-react";
import { getContact } from "@/lib/api";

const panelItems = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    text: "A well-rounded curriculum from Class VI to XII covering Science, Commerce, and Humanities, taught in both English and Tamil medium.",
  },
  {
    icon: Church,
    title: "Thoothukudi Nazareth Diocese",
    text: "Run under the care of the Thoothukudi Nazareth Diocese, whose leadership and support have guided the school for generations.",
  },
  {
    icon: Sprout,
    title: "Beyond the Classroom",
    text: "Sports, Music Club, Scouts, NSS, Eco Club, and Maths Club give students plenty of room to explore their interests.",
  },
  {
    icon: HeartHandshake,
    title: "Caring Community",
    text: "A calm, supportive environment where teachers and staff genuinely look out for every child's wellbeing.",
  },
  {
    icon: Phone,
    title: "Get in Touch",
    text: "popemhsss@gmail.com  ·  04630-273329",
  },
];

export default async function About() {
  const contact = await getContact();
  const items = contact?.length ? contact : [];
  const phone = items.find(i => i.icon === "Phone")?.value || "04630-273329";
  const email = items.find(i => i.icon === "Mail")?.value || "popemhsss@gmail.com";

  const dynamicPanelItems = panelItems.map(item => {
    if (item.title === "Get in Touch") {
      return { ...item, text: `${email}  ·  ${phone}` };
    }
    return item;
  });

  return (
    <section className="bg-white px-[5%] py-22" id="about">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div data-aos="fade-right">
          <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
            Our Story
          </p>
          <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
            A Legacy Built on
            <br />
            Faith &amp; Knowledge
          </h2>
          <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
            Pope Memorial Higher Secondary School traces its origins to Dr.
            George Uglow Pope, who arrived at Sawyerpuram, near Tuticorin, in
            1839 as a missionary with the Society for the Propagation of the
            Gospel.
          </p>

          <div className="mt-2 flex flex-col gap-3 text-[15px] leading-[1.85] text-muted">
            <p>
              Born in Bedeque, Prince Edward Island, Canada, in 1820, Pope
              began training for missionary work at the age of fourteen. He
              had already started learning Tamil as a teenager in England and
              continued his studies during the voyage to India, going on to
              become a scholar of Tamil, Sanskrit, and Telugu. He was
              ordained by the Church of England in 1841.
            </p>
            <p>
              After resigning from his position at Tanjore in 1855, Pope
              founded a seminary at Sawyerpuram to train Anglican Tamil
              clergy — the institution that would grow into Pope Memorial
              Higher Secondary School. He was known and respected locally as
              &ldquo;Pope Aiyar.&rdquo;
            </p>
          </div>
          <div className="mt-8 flex items-center gap-5 rounded-2xl border border-border bg-cream p-5">
            <Image
              src="/pope.jpg"
              alt="Dr. George Uglow Pope"
              width={100}
              height={130}
              className="h-[130px] w-[100px] flex-shrink-0 rounded-lg object-cover"
            />
            <div>
              <strong className="block text-[15px] font-semibold text-[#1c1f2b]">
                Dr. George Uglow Pope
              </strong>
              <span className="mt-1 block text-[13.5px] leading-[1.6] text-muted">
                Founder of the Seminary at Sawyerpuram in 1844 — the institution
                that would grow into Pope Memorial Higher Secondary School.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 rounded-[18px] bg-navy p-9 text-white justify-center">
          {dynamicPanelItems.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="flex items-start gap-3.5 transition-transform duration-300 hover:translate-x-1"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[10px] bg-white/10">
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <strong className="mb-1 block text-[14.5px] text-white">{title}</strong>
                <span className="text-[13px] leading-[1.6] text-[#a0b5d8]">{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
