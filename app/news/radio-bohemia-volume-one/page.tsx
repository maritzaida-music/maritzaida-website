import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Radio Bohemia: A Revival of Sylvia Rexach's Golden Age",
  description:
    "Radio Bohemia is a multi-volume recording series led by Puerto Rican vocalist Maritzaida, created in tribute to the timeless artistry of Sylvia Rexach and Tutti Umpierre.",
  alternates: { canonical: "/news/radio-bohemia-volume-one" },
  robots: { index: false, follow: false },
};

export default function RadioBohemiaNewsPage() {
  return (
    <>
      {/* Page header */}
      <div className="relative pt-32 pb-24 overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/20250828-SSP05607.jpg"
            alt="Maritzaida performing live"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(13,11,9,0.95) 50%, rgba(13,11,9,0.6) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            News · April 12, 2025
          </p>
          <h1
            className="text-4xl md:text-6xl leading-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
          >
            Radio Bohemia: A Revival of<br />Sylvia Rexach&apos;s Golden Age
          </h1>
          <p className="text-xl" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
            Volume One – Coming Fall 2025
          </p>
          <span className="divider-gold" />
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>

          <p>
            Radio Bohemia is a multi-volume recording series led by Puerto Rican vocalist Maritzaida, created in tribute
            to the timeless artistry of Sylvia Rexach and Tutti Umpierre. Drawing inspiration from a series of four live
            radio broadcasts aired in 1953 featuring Rexach and Umpierre, Radio Bohemia reimagines the spirit and
            structure of those vintage programs — blending intimate live performance, scripted narration, and the warmth
            of mid-century radio into a rich and immersive listening experience.
          </p>

          <p>
            Rather than recreating the same setlists from those original broadcasts, Radio Bohemia presents a curated
            selection of lesser-known and previously unrecorded compositions by Rexach and Umpierre. Many of these songs
            were entrusted to Maritzaida by Sharon Riley Rexach, Sylvia&apos;s daughter, who serves as musical advisor
            to the project and appears as a featured vocalist on Volume One. These works — some unpublished for decades —
            open a new chapter in the legacy of Rexach, offering a more complete portrait of her genius as a composer
            and lyricist.
          </p>

          <p>
            Her 2024 album, <em>Alma Adentro: La Música de Sylvia Rexach y Tutti Umpierre</em> — a faithful recreation
            of the 1958 <em>Sylvia Rexach Canta a Sylvia Rexach</em> album — was recognized as one of the Top 20 Most
            Outstanding Albums of 2024 by the Fundación Nacional para la Cultura Popular. As a follow-up, Maritzaida
            and Aaron released <em>El Otro Camino</em>, an EP featuring the four songs written by Rexach and Umpierre
            for the 1959 film of the same name. These songs, long overlooked and never commercially recorded by the
            original duo, were brought to life for the first time in this project — serving as a powerful precursor to
            the Radio Bohemia series and deepening the narrative arc that now continues with Volume One.
          </p>

          <p>
            Accompanying Maritzaida on guitar is her husband and longtime musical partner, Dr. Aaron Weibe, whose
            playing evokes the understated brilliance of Tutti Umpierre. Aaron&apos;s natural sensibility, phrasing,
            and harmonic instincts have led both critics and Sharon Riley Rexach herself to draw striking comparisons
            between his guitar work and that of Umpierre. Rather than imitation, his style feels like an intuitive
            continuation — marked by quiet confidence, emotional restraint, and an ability to shape the space around a
            song without ever overpowering it. His accompaniment provides a steady, expressive foundation that allows
            Rexach&apos;s lyrics — and Maritzaida&apos;s voice — to take flight.
          </p>

          <p>
            Adding to the immersive experience, Puerto Rican actor, director, and educator Robi Arce Martínez performs
            as a fictional 1950s radio announcer, delivering scripted interludes that guide listeners through the album
            like a rediscovered radio transmission. His narration brings warmth, charm, and historical texture,
            enhancing the storytelling that connects each song.
          </p>

          <p>
            The emotional high point of Volume One comes in the final track, &ldquo;Dios de Oro,&rdquo; featuring
            Sharon Riley Rexach. Written by Sylvia Rexach in 1960 during her final days battling cancer,
            &ldquo;Dios de Oro&rdquo; is a haunting farewell that reflects on life, death, and transcendence. Sharon
            first recorded the song over 50 years ago with Tutti Umpierre, shortly after her mother&apos;s passing.
            Now, for the first time since that original recording, she returns to this profoundly personal piece —
            lending her voice and heart to a new interpretation alongside Maritzaida and Aaron. The result is a
            once-in-a-generation performance that bridges time, memory, and devotion.
          </p>

          <p>
            Set for release in Fall 2025, Radio Bohemia: Volume One is more than an album — it&apos;s a living archive
            of Puerto Rico&apos;s música bohemia, brought to life with reverence and care. With its blend of rare
            compositions, vintage radio storytelling, and intergenerational collaboration, Radio Bohemia continues the
            unfinished work of Sylvia Rexach and Tutti Umpierre — ensuring their voices, and their songs, continue to
            echo into the future.
          </p>

        </div>

        {/* Album cover */}
        <div className="my-12 flex justify-center">
          <div className="relative w-64 h-64 rounded-sm overflow-hidden shadow-2xl">
            <Image
              src="/albums/radio-bohemia-vol-1.png"
              alt="Radio Bohemia Volumen I – album cover"
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
          <a
            href="https://www.youtube.com/playlist?list=OLAK5uy_ld2cggMIv854TZcjDki39ZH9NJ2hhIwSc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
            style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
          >
            Listen on YouTube ↗
          </a>
          <Link
            href="/music"
            className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
            style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}
          >
            Full Discography
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}
          >
            About Maritzaida
          </Link>
        </div>
      </article>
    </>
  );
}
