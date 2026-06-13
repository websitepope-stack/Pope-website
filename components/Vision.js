import { getVisionMission } from "@/lib/api";

const CARD_STYLES = [
  { className: "border border-[#c5d5ef] bg-navy-lt", titleClassName: "text-navy" },
  { className: "border border-[#e8c97a] bg-gold-lt", titleClassName: "text-gold" },
  { className: "border border-border bg-cream", titleClassName: "text-[#1c1f2b]" },
];

export default async function Vision() {
  const vision = await getVisionMission();

  const cards = vision?.length
    ? vision.map((v) => ({
        id: v.id,
        title: v.type,
        paragraphs: v.text.split("\n\n").filter(Boolean),
      }))
    : [];

  return (
    <section className="bg-white px-[5%] py-20" id="vision">
      <div data-aos="fade-up">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          Vision &amp; Mission
        </p>
        <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
          What We Stand For
        </h2>
        <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
          Everything we do at school is guided by a simple idea: education
          should build character as much as knowledge, and curiosity should
          last well beyond the classroom.
        </p>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {cards.map((card, i) => {
          const style = CARD_STYLES[i % CARD_STYLES.length];
          return (
            <div
              key={card.id ?? card.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className={`rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(27,58,107,0.1)] ${style.className}`}
            >
              <h3 className={`mb-3.5 font-serif text-[22px] font-bold ${style.titleClassName}`}>
                {card.title}
              </h3>
              {card.paragraphs.map((p, j) => (
                <p key={j} className="mb-2.5 text-[13.5px] leading-[1.75] text-muted">
                  {p}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
