import { getNotices } from "@/lib/api";

export default async function Notice() {
  const notices = await getNotices();
  const active = notices?.filter((n) => n.is_active);
  const text = active?.length
    ? active.map((n) => n.text).join("    •    ")
    : "No active notices.";

  return (
    <div className="flex items-center gap-3.5 bg-navy px-[5%] py-2.5 text-[13px] text-white">
      <span className="whitespace-nowrap rounded bg-gold px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.1em] text-white">
        Notice
      </span>
      <marquee className="flex-1">{text}</marquee>
    </div>
  );
}
