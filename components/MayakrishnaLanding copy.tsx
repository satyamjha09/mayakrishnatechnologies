"use client";

import Image from "next/image";
import { FormEvent, useCallback, useState } from "react";
import { IntroAnimation } from "@/components/IntroAnimation";

const products = [
  {
    name: "AnywhereTally",
    domain: "anywheretally.com",
    href: "https://anywheretally.com",
    description:
      "Tally on Cloud — run TallyPrime from anywhere, anytime, on any device. Secure hosting, daily backups and 24×7 access for your whole team.",
    logo: "/anywhere-tally-logo.png",
    artwork: "/anywhere-tally-artwork.svg",
  },
  {
    name: "TallyKonnect",
    domain: "tallykonnect.com",
    href: "https://tallykonnect.com",
    description:
      "Power up your Tally connectivity — link branches, remote teams and data so everyone works on one Tally, in real time, from wherever they are.",
    logo: "/tally-konnect-logo.png",
    artwork: "/tally-konnect-artwork.svg",
  },
  {
    name: "MayaLabs.ai",
    domain: "mayalabs.ai",
    href: "https://mayalabs.ai",
    description:
      "AI for your paperwork — turn bills, documents and raw business data into structured entries, insights and action, automatically.",
    logo: "/maya-labs-logo.png",
    artwork: "/maya-labs-artwork.svg",
  },
  {
    name: "Metawhat",
    domain: "metawhat.in",
    href: "https://metawhat.in",
    description:
      "WhatsApp automation for business — broadcasts, chatbots and customer conversations at scale, straight from the tools you already use.",
    logo: "/metawhat-logo.png",
    artwork: "/metawhat-artwork.svg",
  },
] as const;

const focusAreas = [
  {
    number: "01",
    title: "Tally automation",
    text: "Cloud access, connected teams and smoother accounting workflows.",
  },
  {
    number: "02",
    title: "Customer automation",
    text: "Build faster conversations and scalable WhatsApp experiences.",
  },
] as const;

export function MayakrishnaLanding() {
  const [revealed, setRevealed] = useState(false);
  const handleReveal = useCallback(() => setRevealed(true), []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <IntroAnimation onReveal={handleReveal} />

      <main
        className={`page-shell min-h-screen bg-[#e9f2fd] text-navy ${
          revealed ? "is-revealed" : ""
        }`}
      >
        <header className="reveal-navbar sticky top-0 z-40 border-b border-navy/10 bg-white/90 text-navy shadow-[0_8px_30px_rgba(15,42,92,0.06)] backdrop-blur-xl">
          <nav className="mx-auto flex h-[84px] max-w-[1180px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
            <a
              href="#top"
              aria-label="Mayakrishna Technologies home"
              className="group flex min-w-0 items-center gap-3.5"
            >
              <Image
                src="/mayakrishna-logo.png"
                alt="Mayakrishna Technologies logo"
                width={440}
                height={440}
                priority
                className="size-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:size-14"
              />

              <div className="flex flex-col">
                <span className="truncate font-jakarta text-[clamp(1.15rem,2.8vw,1.45rem)] font-extrabold tracking-[-0.02em] text-navy">
                  Mayakrishna Technologies
                </span>
                <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wide text-[#2563EB]">
                  Automation built around Tally
                </span>
              </div>
            </a>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href="#about"
                className="rounded-full px-3.5 py-2 text-xs font-bold text-navy transition-colors hover:bg-navy/5 hover:text-royal sm:px-4 sm:text-sm"
              >
                About Us
              </a>
              <a
                href="#contact"
                className="rounded-full bg-navy px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_rgba(15,42,92,0.2)] transition-[transform,background] hover:-translate-y-0.5 hover:bg-royal sm:px-5 sm:text-sm"
              >
                Contact Us
              </a>
            </div>
          </nav>
        </header>

        <div id="top" aria-hidden="true" className="scroll-mt-24" />

        <section className="cards-zone-bg px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <div className="mx-auto mb-8 max-w-[1080px] sm:mb-10">
            <h1 className="reveal-section-label text-xs font-extrabold uppercase tracking-[0.24em] text-royal">
              Our products
            </h1>
            <p className="reveal-section-copy mt-3 max-w-xl text-base font-medium leading-6 text-[#2C3E50] sm:text-lg">
              Explore the Mayakrishna ecosystem for Tally, AI and customer
              communication.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-[22px] min-[821px]:grid-cols-2">
            {products.map((product, index) => (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal-card group relative flex flex-col overflow-hidden rounded-[20px] bg-white text-navy no-underline shadow-[0_8px_30px_rgba(15,42,92,0.08)] outline-none transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.75,.25,1)] hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(15,42,92,0.16),0_0_0_2px_rgba(37,99,235,0.4)] focus-visible:-translate-y-2 focus-visible:shadow-[0_24px_56px_rgba(15,42,92,0.16),0_0_0_3px_#2563EB]"
                style={{ animationDelay: `${0.2 + index * 0.12}s` }}
              >
                <div className="h-[190px] overflow-hidden max-[480px]:h-40">
                  <img
                    src={product.artwork}
                    alt=""
                    className="block h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.75,.25,1)] group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 px-6 pb-6 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#E0E8F4] bg-white shadow-[0_3px_10px_rgba(8,18,38,0.12)]">
                      <Image
                        src={product.logo}
                        alt={`${product.name} logo`}
                        width={96}
                        height={96}
                        className="h-[70%] w-[70%] object-contain"
                      />
                    </span>

                    <h2 className="font-jakarta text-[1.32rem] font-extrabold tracking-[-0.01em] text-navy">
                      {product.name}
                      <small className="mt-[3px] block font-jakarta text-[0.62rem] font-bold uppercase tracking-[0.14em] text-royal">
                        {product.domain}
                      </small>
                    </h2>
                  </div>

                  <p className="mt-1 flex-1 text-[0.92rem] leading-[1.55] text-[#43506B]">
                    {product.description}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-[0.9rem] font-bold text-royal before:h-0.5 before:w-[22px] before:rounded-full before:bg-gold before:transition-[width] before:duration-300 group-hover:before:w-[38px]">
                    Visit site
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-24 bg-white/70 px-4 py-20 text-navy backdrop-blur-sm sm:px-6 lg:py-24"
        >
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-royal">
                ABOUT MAYAKRISHNA
              </p>
              <h2 className="mt-3 max-w-2xl font-jakarta text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-navy">
                Making everyday business easier with Tally and automation.
              </h2>

              <div className="mt-6 space-y-4 text-base leading-7 text-[#3A4D6F]">
                <p>
                  Mayakrishna Technologies builds practical solutions that help businesses get more from Tally and simplify their day-to-day work.
                </p>
                <p>
                  Our products make it easier to access Tally from anywhere, manage business data, automate repetitive tasks and stay organised across accounting and customer communication.
                  We help businesses save time, reduce manual effort and keep work moving smoothly.
                </p>
              </div>

              {/* <div className="mt-7 rounded-2xl border border-royal/20 bg-[#EBF3FA] p-5 shadow-sm">
                <p className="font-jakarta text-base font-bold italic leading-relaxed text-navy">
                  &ldquo;Less repetitive work. Easier Tally operations. Better business every day.&rdquo;
                </p>
              </div> */}
            </div>

            <div className="grid gap-5 lg:mt-10">
              <article className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_12px_35px_rgba(15,42,92,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-[0_20px_45px_rgba(15,42,92,0.14)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-royal/10 font-jakarta font-extrabold text-sm text-royal">
                    01
                  </span>
                  <h3 className="font-jakarta text-lg font-extrabold text-navy">
                    Simpler Tally operations
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#4A5A78]">
                  Access, connect and manage Tally more easily across teams, locations and devices.
                </p>
              </article>

              <article className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_12px_35px_rgba(15,42,92,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-[0_20px_45px_rgba(15,42,92,0.14)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-gold/20 font-jakarta font-extrabold text-sm text-navy">
                    02
                  </span>
                  <h3 className="font-jakarta text-lg font-extrabold text-navy">
                    Easier everyday workflows
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#4A5A78]">
                  Automate routine tasks, organise business information and give your team more time to focus on growth.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section-bg scroll-mt-24 px-4 py-20 sm:px-6 lg:py-24"
        >
          <div className="mx-auto grid max-w-[1080px] overflow-hidden rounded-[28px] border border-navy/10 bg-white/80 shadow-[0_25px_70px_rgba(15,42,92,0.1)] backdrop-blur-md lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-royal">
                Contact us
              </p>
              <h2 className="mt-4 font-jakarta text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-navy">
                Let&apos;s automate what slows your business down.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#4A5A78] sm:text-base">
                Share the workflow you want to improve. Our team can help you
                choose the right Mayakrishna product or build the next step.
              </p>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="grid gap-4 bg-white p-7 text-navy sm:p-10 lg:p-12"
            >
              <label className="grid gap-2 text-sm font-semibold text-navy">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="h-12 rounded-xl border border-navy/15 bg-fog/50 px-4 font-normal outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/10"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                Work email
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="h-12 rounded-xl border border-navy/15 bg-fog/50 px-4 font-normal outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/10"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                What do you want to automate?
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your workflow..."
                  className="resize-none rounded-xl border border-navy/15 bg-fog/50 px-4 py-3 font-normal outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/10"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-navy px-6 text-sm font-bold text-white transition-[transform,background] hover:-translate-y-0.5 hover:bg-royal"
              >
                Send enquiry
              </button>
            </form>
          </div>
        </section>

        <footer className="reveal-footer bg-white border-t border-navy/10 px-6 pb-[38px] pt-[26px] text-center font-jakarta text-[0.78rem] font-semibold tracking-[0.08em] text-navy/70">
          © 2026 Mayakrishna Technologies
        </footer>
      </main>
    </>
  );
}
