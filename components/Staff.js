import { getStaff } from "@/lib/api";

const STAFF_GROUPS = [
  "Leadership",
  "PG Assistants",
  "BT Assistants",
  "Sec. Grade Assistants",
  "Non-Teaching Staff",
  "Management Staff",
];

export default async function Staff() {
  const staff = await getStaff();
  const items = staff?.length ? staff : [];

  const leadership = items.filter((m) => m.group === "Leadership");
  const groups = STAFF_GROUPS.slice(1)
    .map((title) => ({
      title,
      members: items.filter((m) => (m.group || "PG Assistants") === title),
    }))
    .filter((g) => g.members.length);

  return (
    <section className="bg-cream px-[5%] py-20" id="staff">
      <div data-aos="fade-up">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          Our Team
        </p>
        <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
          Heads of Pope School
        </h2>
        <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
          Our dedicated and qualified team of educators is committed to guiding
          every student toward their highest potential.
        </p>
      </div>

      {leadership.length > 0 && (
        <div className="mt-11 rounded-2xl border border-border bg-white p-8" data-aos="zoom-in">
          <h3 className="mb-5 font-serif text-[22px] font-bold text-navy">School Leadership</h3>
          <div className="flex flex-col gap-3">
            {leadership.map((person) => (
              <div
                key={person.id ?? person.name}
                className="flex items-center gap-3.5 rounded-lg bg-cream px-4 py-3"
              >
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                <div>
                  <div className="text-sm font-semibold text-[#1c1f2b]">{person.name}</div>
                  <div className="mt-0.5 text-xs text-muted">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {groups.map((col, index) => (
          <div
            key={col.title}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
            className="rounded-2xl border border-border bg-white p-6.5"
          >
            <h3 className="mb-4 border-b border-border pb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-navy">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.members.map((member) => (
                <li key={member.id ?? member.name} className="text-[13px] leading-[1.5] text-muted">
                  <span className="font-medium text-[#1c1f2b]">{member.name}</span>
                  {member.role && <span> — {member.role}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
