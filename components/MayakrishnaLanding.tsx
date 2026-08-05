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
const companyLogos = [
  { name: "Canara Bank", fileName: "canarabank" },
  { name: "Cashfree Payments", fileName: "cashfreepayment" },
  { name: "AU Small Finance Bank", fileName: "download" },
  { name: "Easebuzz", fileName: "easebuzz" },
  { name: "ICICI Bank", fileName: "icicbank" },
  { name: "Mswipe", fileName: "mswipe" },
  { name: "OmniCard", fileName: "omnicard" },
  { name: "RBL Bank", fileName: "rblbank" },
  { name: "Sepfust", fileName: "sepfust" },
  { name: "YES BANK", fileName: "yesbank" },
  { name: "IDFC FIRST Bank", fileName: "idfcfirst" },
] as const;

const companyLogoExtensions = ["png", "svg", "webp", "jpg", "jpeg"] as const;

type CompanyLogoProps = (typeof companyLogos)[number];
type ContactStatus = {
  type: "success" | "error";
  message: string;
} | null;

function CompanyLogo({ name, fileName }: CompanyLogoProps) {
  const [extensionIndex, setExtensionIndex] = useState(0);
  const imageSource = `/company/${fileName}.${companyLogoExtensions[extensionIndex]}`;

  return (
    <img
      src={imageSource}
      alt={`${name} logo`}
      loading="lazy"
      draggable={false}
      onError={(event) => {
        if (extensionIndex < companyLogoExtensions.length - 1) {
          setExtensionIndex((currentIndex) => currentIndex + 1);
          return;
        }

        event.currentTarget.style.display = "none";
      }}
      className="h-11 w-auto max-w-[150px] select-none object-contain sm:h-12 sm:max-w-[175px]"
    />
  );
}


export function MayakrishnaLanding() {
  const [revealed, setRevealed] = useState(false);
  const [isSendingContact, setIsSendingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>(null);
  const handleReveal = useCallback(() => setRevealed(true), []);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSendingContact(true);
    setContactStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          businessSize: formData.get("businessSize"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your message.");
      }

      form.reset();
      setContactStatus({
        type: "success",
        message: result.message || "Your message was sent successfully.",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message. Please try again.",
      });
    } finally {
      setIsSendingContact(false);
    }
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
          <nav className="mx-auto flex h-[84px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
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
                className="size-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 gap:-2 sm:size-20"
              />

              <div className="flex flex-col">
                <span className="truncate font-jakarta text-[clamp(1.15rem,2.8vw,1.45rem)] font-extrabold tracking-[-0.02em] text-navy">
                  Mayakrishna Technologies Pvt Ltd
                </span>
                <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wide text-[#2563EB]">
                  Automations, built around Tally
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
          aria-label="Company partners and integrations"
          className="border-y border-navy/10 bg-white py-4 sm:py-10"
        >
          <div className="mx-auto max-w-[1080px]">
            <div className="text-center">
              <h1 className="text-xs font-extrabold uppercase tracking-[0.24em] text-royal text-size-[0.78rem] sm:text-sm">
                trusted by industry leaders
              </h1>
              
            </div>

            <div className="company-logo-slider relative mt-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="company-logo-track flex w-max items-center">
                <div className="flex shrink-0 items-center gap-5 pr-5 sm:gap-7 sm:pr-7">
                  {companyLogos.map((company) => (
                    <div
                      key={company.fileName}
                      className="flex h-[82px] w-[180px] shrink-0 items-center justify-center px-5 sm:h-[92px] sm:w-[210px]"
                    >
                      <CompanyLogo {...company} />
                    </div>
                  ))}
                </div>

                <div
                  aria-hidden="true"
                  className="flex shrink-0 items-center gap-5 pr-5 sm:gap-7 sm:pr-7"
                >
                  {companyLogos.map((company) => (
                    <div
                      key={`duplicate-${company.fileName}`}
                      className="flex h-[82px] w-[180px] shrink-0 items-center justify-center px-5 sm:h-[92px] sm:w-[210px]"
                    >
                      <CompanyLogo {...company} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            </div>

            <div className="grid gap-5 lg:mt-10">
              <article className="group relative overflow-hidden rounded-2xl border border-blue-300/30 bg-[linear-gradient(120deg,#2774ae,#2774ae,#002E5D)] bg-[length:300%_300%] p-6 shadow-[0_18px_45px_rgba(0,46,93,0.28)] animate-[powerFlow_7s_ease_infinite] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,46,93,0.38)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(39,116,174,0.22),transparent_32%)] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:w-1/3 after:skew-x-[-20deg] after:bg-white/15 after:blur-xl after:animate-[powerShine_4s_linear_infinite] after:content-['']">
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex size-16 shrink-0 items-center justify-center overflow-visible">
                  <Image
                    src="/logo2.png"
                    alt="Simpler Tally operations"
                    width={64}
                    height={64}
                    className="h-full w-full scale-[1.7] object-contain"
                  />
                </span>

                <h3 className="font-jakarta text-lg font-extrabold text-white">
                  Simpler Tally operations
                </h3>
              </div>

              <p className="relative z-10 mt-3 text-sm leading-6 text-white/85">
                Access, connect and manage Tally more easily across teams, locations and
                devices.
              </p>
            </article>

             <article className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_12px_35px_rgba(15,42,92,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_20px_45px_rgba(15,42,92,0.14)] hover:border-green-500 hover:ring-2 hover:ring-green-500/20 after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:w-1/3 after:skew-x-[-20deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)] after:blur-xl after:animate-[powerShine_4s_linear_infinite] after:content-['']">
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex size-16 shrink-0 items-center justify-center overflow-visible">
                  <Image
                    src="/logo1.png"
                    alt="Easier everyday workflows"
                    width={64}
                    height={64}
                    className="h-full w-full scale-[1.7] object-contain"
                  />
                </span>

                <h3 className="font-jakarta text-lg font-extrabold text-navy">
                  Easier everyday workflows
                </h3>
              </div>

              <p className="relative z-10 mt-3 text-sm leading-6 text-[#4A5A78]">
                Automate routine tasks, organise business information and give your team
                more time to focus on growth.
              </p>
            </article>
            </div>
          </div>
        </section>

          <section
            id="contact"
            className="contact-section-bg scroll-mt-24 px-4 py-10 sm:px-6 lg:py-12"
          >
            <div className="mx-auto grid max-w-[1080px] overflow-hidden rounded-[24px] border border-[#D7E3F4] bg-white shadow-[0_20px_55px_rgba(15,42,92,0.12)] lg:grid-cols-[1.35fr_0.9fr]">
              {/* LEFT SIDE — CONTACT FORM */}
              <form
                onSubmit={handleContactSubmit}
                className="grid gap-4 p-5 sm:p-7 lg:p-8"
              >
          {/* FIRST NAME AND LAST NAME */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold text-navy">
              First name

              <input
                type="text"
                name="firstName"
                placeholder="Rajan"
                required
                className="h-[50px] rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 text-sm font-normal text-navy outline-none transition placeholder:text-[#9AA8BF] focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-bold text-navy">
              Last name

              <input
                type="text"
                name="lastName"
                placeholder="Sharma"
                required
                className="h-[50px] rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 text-sm font-normal text-navy outline-none transition placeholder:text-[#9AA8BF] focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
              />
            </label>
          </div>

          {/* EMAIL AND PHONE */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold text-navy">
              Work email

              <input
                type="email"
                name="email"
                placeholder="rajan@yourcompany.com"
                required
                className="h-[50px] rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 text-sm font-normal text-navy outline-none transition placeholder:text-[#9AA8BF] focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-bold text-navy">
              Phone No.

              <input
                type="tel"
                name="phone"
                placeholder="+91 83XXXXXXXX"
                required
                className="h-[50px] rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 text-sm font-normal text-navy outline-none transition placeholder:text-[#9AA8BF] focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
              />
            </label>
          </div>

          {/* COMPANY AND BUSINESS SIZE */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold text-navy">
              Company

              <input
                type="text"
                name="company"
                placeholder="Your Company Ltd."
                className="h-[50px] rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 text-sm font-normal text-navy outline-none transition placeholder:text-[#9AA8BF] focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-bold text-navy">
              Business size

              <select
                name="businessSize"
                defaultValue="1-10"
                className="h-[50px] cursor-pointer rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 text-sm font-normal text-navy outline-none transition focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
              >
                <option value="1-10">1 to 10 employees</option>
                <option value="11-50">11 to 50 employees</option>
                <option value="51-100">51 to 100 employees</option>
                <option value="101-500">101 to 500 employees</option>
                <option value="500+">More than 500 employees</option>
              </select>
            </label>
          </div>

      {/* MESSAGE */}
      <label className="grid gap-1.5 text-sm font-bold text-navy">
        How can we help?

        <textarea
          name="message"
          rows={3}
          required
          placeholder="Tell us what you want to automate in Tally"
          className="min-h-[96px] resize-y rounded-xl border border-[#CFE0F5] bg-[#F3F7FD] px-4 py-3 text-sm font-normal leading-6 text-navy outline-none transition placeholder:text-[#9AA8BF] focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10"
        />
      </label>

      <p className="text-xs leading-5 text-[#6680A6] sm:text-sm">
        By submitting, you agree to be contacted about Mayakrishna products
        and services.
      </p>

      {contactStatus ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-bold ${
            contactStatus.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {contactStatus.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSendingContact}
        className="inline-flex h-[50px] items-center justify-center rounded-xl bg-gradient-to-r from-[#2563EB] to-[#124DAF] px-6 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]"
      >
        {isSendingContact ? "Sending..." : "Send message"}
      </button>
    </form>

    {/* RIGHT SIDE — CONTACT DETAILS */}
    <div className="relative overflow-hidden bg-[linear-gradient(145deg,#102F6A_0%,#174EA6_100%)] p-6 text-white sm:p-7 lg:p-8">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -left-28 size-64 rounded-full bg-purple-400/15 blur-3xl" />

      <div className="relative z-10">
        <h2 className="font-jakarta text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
          Reach us directly
        </h2>

        <div className="mt-6 divide-y divide-white/15">
          {/* PHONE */}
          <div className="flex gap-3 py-4 first:pt-0">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg backdrop-blur">
              ☎
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-blue-200">
                Phone
              </p>

              <a
                href="tel:+918375938947"
                className="mt-1 block text-sm font-semibold text-white transition hover:text-blue-200"
              >
                +91-8375938947
              </a>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex gap-3 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg backdrop-blur">
              ✉
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-blue-200">
                Email
              </p>

              <a
                href="mailto:mayakrishnatechnologies@gmail.com"
                className="mt-1 block break-all text-sm font-semibold text-white transition hover:text-blue-200"
              >
                mayakrishnatechnologies@gmail.com
              </a>
            </div>
          </div>

          {/* BUSINESS HOURS */}
          <div className="flex gap-3 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg backdrop-blur">
              ◷
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-blue-200">
                Hours
              </p>

              <p className="mt-1 text-sm font-semibold leading-6 text-white">
                Monday to Friday: 10 AM to 6:30 PM
                <br />
                Saturday: 10 AM to 4 PM
              </p>
            </div>
          </div>

          {/* OFFICE */}
          <div className="flex gap-3 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg backdrop-blur">
              📍
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-blue-200">
                Office
              </p>

              <address className="mt-1 not-italic text-sm font-semibold leading-6 text-white">
                R-3/A, Dooars Transport Compound,
                <br />
                GT Road, Sahibabad, Ghaziabad,
                <br />
                UP 201005
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
          </section>

        <footer className="reveal-footer bg-white border-t border-navy/10 px-6 pb-[38px] pt-[26px] text-center font-jakarta text-[0.78rem] font-semibold tracking-[0.08em] text-navy/70">
          © 2026 Mayakrishna Technologies
        </footer>
      </main>

      <style jsx global>{`
        .company-logo-track {
          animation: company-logo-scroll 34s linear infinite;
          will-change: transform;
        }

        .company-logo-slider:hover .company-logo-track {
          animation-play-state: paused;
        }

        @keyframes company-logo-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .company-logo-track {
            animation-duration: 25s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .company-logo-track {
            animation: none;
          }
        }
      `}</style>

    </>
  );
}
