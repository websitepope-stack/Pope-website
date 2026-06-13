import { getRules } from "@/lib/api";

export default async function Rules() {
  const rules = await getRules();

  const items = rules?.length ? rules : [];

  return (
    <section className="bg-white px-[5%] py-20" id="rules">
      <div data-aos="fade-up">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          School Norms
        </p>
        <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
          Rules &amp; Regulations
        </h2>
        <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
          We follow a clear set of rules that help students learn
          responsibility and respect, and keep the school a good place to
          learn for everyone.
        </p>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ol className="flex flex-col gap-2.5" data-aos="fade-right">
          {items.map((rule, index) => (
            <li
              key={rule.id}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 60}
              className="flex items-start gap-3.5 text-sm leading-[1.6] text-muted"
            >
              <span className="min-w-[28px] flex-shrink-0 font-serif text-lg font-bold text-navy">
                {String(rule.number).padStart(2, "0")}
              </span>
              {rule.text}
            </li>
          ))}
        </ol>

        <div className="h-fit rounded-2xl bg-navy p-8 text-white">
          <h3 className="mb-4 font-serif text-[22px] font-bold text-white">Dress Code</h3>
          <p className="text-sm leading-[1.75] text-[#a0b5d8]">
            As a boys&apos; school, we keep the uniform simple and smart: a
            white shirt, brown pants, the school tie, and polished black
            shoes.
          </p>
          <br />
          <p className="text-sm leading-[1.75] text-[#a0b5d8]">
            Uniforms are checked regularly, not as a formality but because
            it helps students take pride in how they present themselves,
            something that carries over into how they carry themselves more
            generally.
          </p>
        </div>
      </div>
    </section>
  );
}
