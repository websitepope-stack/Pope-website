import { getStreams } from "@/lib/api";

export default async function Academics() {
  const streams = await getStreams();

  const items = (streams || []).map((s) => ({
    id: s.id,
    title: s.name,
    subjects: s.subjects.split(",").map((sub) => sub.trim()).filter(Boolean),
    tag: s.level,
  }));

  return (
    <section className="bg-white px-[5%] py-20" id="academics">
      <div data-aos="fade-up">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          Academic Programmes
        </p>
        <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
          Courses We Offer
        </h2>
        <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
          Alongside the core subjects, every class includes computer
          literacy, project work, practical art, and physical education as
          part of the regular timetable.
        </p>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((s, index) => (
          <div
            key={s.id ?? s.title}
            data-aos="fade-up"
            data-aos-delay={(index % 5) * 80}
            className="rounded-2xl border border-border bg-cream p-6.5 transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
          >
            <h3 className="mb-2.5 text-[15.5px] font-semibold text-navy">{s.title}</h3>
            <ul className="flex flex-col gap-1.5">
              {s.subjects.map((sub) => (
                <li key={sub} className="flex items-center gap-1.5 text-[13px] text-muted">
                  <span className="text-lg leading-none text-gold">·</span>
                  {sub}
                </li>
              ))}
            </ul>
            <span className="mt-3.5 inline-block rounded bg-navy-lt px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-[0.07em] text-navy">
              {s.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
