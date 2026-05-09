import { useReveal } from "@/hooks/use-reveal";
import { SectionHeader } from "./section-header";
import { useSettings } from "@/hooks/use-settings";

export function Location() {
  const ref = useReveal<HTMLDivElement>();
  const { settings } = useSettings();

  return (
    <section className="relative py-20 md:py-48 px-6 pb-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        <div>
          <SectionHeader
            eyebrow="Find Us"
            title="A quiet corner, waiting for you."
            subtitle="Visit us in person — for the slow conversations, the warm light, and the first sip you'll remember."
          />

          <div className="mt-8 space-y-3 text-cocoa/75 font-light">

            <div className="flex items-start gap-3">
              <span className="text-champagne mt-1">·</span>

              <span className="max-w-[280px] leading-relaxed">
                {settings.address}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-champagne mt-1">·</span>

              <span>
                {settings.timings ||
                  "Open daily · 11:00 — 23:00"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-champagne mt-1">·</span>

              <a
                href={`tel:${settings.phone.replace(
                  /\s/g,
                  ""
                )}`}
                className="hover:text-champagne transition-colors"
              >
                {settings.phone}
              </a>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                settings.address
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-luxe btn-luxe-ghost"
            >
              Open in Maps
            </a>
          </div>
        </div>

        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-[28px] border border-[#C9A46A]/15 bg-white/40 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.06)] aspect-[4/3] md:aspect-square"
        >
          <iframe
            title={`${settings.businessName} location`}
            src={settings.mapsLink}
            className="absolute inset-0 w-full h-full"
            style={{
              border: 0,
              filter: "contrast(1.02)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(255,248,240,0.05), transparent 35%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}