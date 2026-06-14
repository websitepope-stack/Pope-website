import { getDioceses, resolveImage } from "@/lib/api";

function initialsOf(name) {
  return name
    .replace(/^(Rt\.|Rev\.|Mr\.|Mrs\.|Ms\.|Dr\.)\s*/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ person, size }) {
  if (person.image_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveImage(person.image_url, 200).src}
        alt={person.name}
        className={`${size} flex-shrink-0 items-start justify-start rounded-full object-cover`}
      />
    );
  }
  return (
    <div className={`${size} flex flex-shrink-0 items-start justify-start rounded-full bg-gradient-to-br from-[#d7e4f5] to-[#b8cce8] font-serif font-bold text-navy`}>
      {initialsOf(person.name)}
    </div>
  );
}

export default async function Diocese() {
  const dioceses = await getDioceses();
  //console.log("DIOCESES DATA:", dioceses);

  let head = null;
  let members = [];
  if (dioceses?.length) {
    const sorted = [...dioceses].sort((a, b) => (a.rank ?? 100) - (b.rank ?? 100));
    head = sorted[0];
    members = sorted.slice(1);
  }

  if (!head) return null;

  return (
    <section className="bg-cream px-[5%] py-20" id="diocese">
      <div data-aos="fade-up">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          Governing Body
        </p>
        <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
          Thoothukudi Nazareth Diocese
        </h2>
        <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
          Our school operates under the oversight of the Thoothukudi Nazareth
          Diocese, guided by its distinguished leadership.
        </p>
      </div>

      <div className="mt-11 flex flex-col items-center gap-4 rounded-2xl bg-navy p-8 text-center text-white sm:flex-row sm:gap-6 sm:text-left" data-aos="zoom-in">
        <div className="flex h-[84px] w-[84px] flex-shrink-0 items-center justify-center rounded-full bg-white/10 font-serif text-3xl font-bold text-gold overflow-hidden">
          {head.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolveImage(head.image_url, 200).src} alt={head.name} className="h-full w-full object-cover" />
          ) : (
            initialsOf(head.name)
          )}
        </div>
        <div>
          <div className="text-lg font-semibold text-white">{head.name}</div>
          <div className="mt-1 text-[13px] font-medium uppercase tracking-[0.06em] text-gold">
            {head.role}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, index) => (
          <div
            key={m.id ?? m.name}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
            className="rounded-2xl border border-border bg-white p-7 text-center transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(27,58,107,0.1)]"
          >
            <div className="mx-auto mb-3.5">
              <Avatar person={m} size="h-[70px] w-[70px] mx-auto text-2xl" />
            </div>
            <div className="mb-1 text-[15px] font-semibold text-[#1c1f2b]">{m.name}</div>
            <div className="text-[12.5px] font-medium uppercase tracking-[0.06em] text-gold">
              {m.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
