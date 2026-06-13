import { getAboutStats, getHeroImages } from "@/lib/api";
import HeroCarousel from "./HeroCarousel";

export default async function Hero() {
  const [aboutStats, heroImagesRaw] = await Promise.all([
    getAboutStats(),
    getHeroImages()
  ]);
  const stats = aboutStats ?? [];
  const heroImages = heroImagesRaw ?? [];

  return (
    <section className="grid min-h-[88vh] grid-cols-1 items-center gap-12 bg-gradient-to-br from-cream via-[#eef2fa] to-white px-[5%] py-20 lg:grid-cols-2 lg:gap-16 lg:py-[90px]">
      <div className="mx-auto w-full max-w-[580px] lg:mx-0">
        <div
          className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-[20px] border border-[#e8c97a] bg-gold-lt px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.07em] text-gold"
          style={{ animationDelay: "0ms" }}
        >
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
          Est. 1844 · Over 180 Years of Excellence
        </div>
        <h1
          className="mb-5 animate-fade-up font-serif text-[clamp(38px,5.5vw,64px)] font-bold leading-[1.08] text-[#1c1f2b]"
          style={{ animationDelay: "100ms" }}
        >
          Nurturing Minds,
          <br />
          <em className="text-navy not-italic italic">Shaping Futures</em>
        </h1>
        <p
          className="mb-9 max-w-[500px] animate-fade-up text-base leading-[1.75] text-muted"
          style={{ animationDelay: "200ms" }}
        >
          Pope Memorial Higher Secondary School in Sawyerpuram has been
          teaching and guiding students since 1844, helping them build
          knowledge, character, and confidence for the years ahead.
        </p>
        <div
          className="mb-12 flex animate-fade-up flex-wrap gap-3.5"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href="#about"
            className="rounded-lg bg-navy px-7 py-3.5 text-[14.5px] font-medium text-white shadow-[0_4px_14px_rgba(27,58,107,0.25)] transition-all hover:bg-navy-dk hover:shadow-[0_6px_20px_rgba(27,58,107,0.35)]"
          >
            Explore School
          </a>
          <a
            href="#contact"
            className="rounded-lg border-[1.5px] border-navy px-6.5 py-3 text-[14.5px] font-medium text-navy transition-colors hover:bg-navy-lt"
          >
            Get in Touch
          </a>
        </div>
        <div
          className="flex animate-fade-up gap-9 border-t border-border pt-2"
          style={{ animationDelay: "400ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.id ?? stat.label}>
              <div className="font-serif text-4xl font-bold leading-none text-navy">{stat.number}</div>
              <div className="mt-2 text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-full w-full animate-fade-in" style={{ animationDelay: "150ms" }}>
        <HeroCarousel heroImages={heroImages} />
      </div>
    </section>
  );
}
