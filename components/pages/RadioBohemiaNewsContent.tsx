"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

const content = {
  en: {
    label: "News · April 12, 2025",
    title: "Radio Bohemia: A Revival of Sylvia Rexach's Golden Age",
    subtitle: "Volume One – Coming Fall 2025",
    p1: "Radio Bohemia is a multi-volume recording series led by Puerto Rican vocalist Maritzaida, created in tribute to the timeless artistry of Sylvia Rexach and Tutti Umpierre. Drawing inspiration from a series of four live radio broadcasts aired in 1953 featuring Rexach and Umpierre, Radio Bohemia reimagines the spirit and structure of those vintage programs — blending intimate live performance, scripted narration, and the warmth of mid-century radio into a rich and immersive listening experience.",
    p2: "Rather than recreating the same setlists from those original broadcasts, Radio Bohemia presents a curated selection of lesser-known and previously unrecorded compositions by Rexach and Umpierre. Many of these songs were entrusted to Maritzaida by Sharon Riley Rexach, Sylvia's daughter, who serves as musical advisor to the project and appears as a featured vocalist on Volume One. These works — some unpublished for decades — open a new chapter in the legacy of Rexach, offering a more complete portrait of her genius as a composer and lyricist.",
    p3_a: "Her 2024 album, ",
    p3_alma: "Alma Adentro: La Música de Sylvia Rexach y Tutti Umpierre",
    p3_b: " — a faithful recreation of the 1958 ",
    p3_canta: "Sylvia Rexach Canta a Sylvia Rexach",
    p3_c: " album — was recognized as one of the Top 20 Most Outstanding Albums of 2024 by the Fundación Nacional para la Cultura Popular. As a follow-up, Maritzaida and Aaron released ",
    p3_otro: "El Otro Camino",
    p3_d: ", an EP featuring the four songs written by Rexach and Umpierre for the 1959 film of the same name. These songs, long overlooked and never commercially recorded by the original duo, were brought to life for the first time in this project — serving as a powerful precursor to the Radio Bohemia series and deepening the narrative arc that now continues with Volume One.",
    p4: "Accompanying Maritzaida on guitar is her husband and longtime musical partner, Dr. Aaron Weibe, whose playing evokes the understated brilliance of Tutti Umpierre. Aaron's natural sensibility, phrasing, and harmonic instincts have led both critics and Sharon Riley Rexach herself to draw striking comparisons between his guitar work and that of Umpierre. Rather than imitation, his style feels like an intuitive continuation — marked by quiet confidence, emotional restraint, and an ability to shape the space around a song without ever overpowering it. His accompaniment provides a steady, expressive foundation that allows Rexach's lyrics — and Maritzaida's voice — to take flight.",
    p5: "Adding to the immersive experience, Puerto Rican actor, director, and educator Robi Arce Martínez performs as a fictional 1950s radio announcer, delivering scripted interludes that guide listeners through the album like a rediscovered radio transmission. His narration brings warmth, charm, and historical texture, enhancing the storytelling that connects each song.",
    p6: "The emotional high point of Volume One comes in the final track, \"Dios de Oro,\" featuring Sharon Riley Rexach. Written by Sylvia Rexach in 1960 during her final days battling cancer, \"Dios de Oro\" is a haunting farewell that reflects on life, death, and transcendence. Sharon first recorded the song over 50 years ago with Tutti Umpierre, shortly after her mother's passing. Now, for the first time since that original recording, she returns to this profoundly personal piece — lending her voice and heart to a new interpretation alongside Maritzaida and Aaron. The result is a once-in-a-generation performance that bridges time, memory, and devotion.",
    p7: "Set for release in Fall 2025, Radio Bohemia: Volume One is more than an album — it's a living archive of Puerto Rico's música bohemia, brought to life with reverence and care. With its blend of rare compositions, vintage radio storytelling, and intergenerational collaboration, Radio Bohemia continues the unfinished work of Sylvia Rexach and Tutti Umpierre — ensuring their voices, and their songs, continue to echo into the future.",
    cta_listen: "Listen on YouTube ↗",
    cta_discography: "Full Discography",
    cta_about: "About Maritzaida",
  },
  es: {
    label: "Noticias · 12 de abril de 2025",
    title: "Radio Bohemia: Un Renacimiento de la Era Dorada de Sylvia Rexach",
    subtitle: "Volumen Uno – Otoño 2025",
    p1: "Radio Bohemia es una serie de grabaciones de múltiples volúmenes liderada por la vocalista puertorriqueña Maritzaida, creada en homenaje al arte atemporal de Sylvia Rexach y Tutti Umpierre. Inspirándose en una serie de cuatro transmisiones radiales en vivo de 1953 con Rexach y Umpierre, Radio Bohemia reimagina el espíritu y la estructura de esos programas de época — fusionando actuación en vivo íntima, narración guionizada y la calidez de la radio de mediados del siglo XX en una experiencia auditiva rica e inmersiva.",
    p2: "En lugar de recrear las mismas listas de canciones de aquellas transmisiones originales, Radio Bohemia presenta una selección curada de composiciones poco conocidas y nunca antes grabadas de Rexach y Umpierre. Muchas de estas canciones fueron confiadas a Maritzaida por Sharon Riley Rexach, hija de Sylvia, quien funge como asesora musical del proyecto y aparece como vocalista invitada en el Volumen Uno. Estas obras — algunas inéditas por décadas — abren un nuevo capítulo en el legado de Rexach, ofreciendo un retrato más completo de su genio como compositora y letrista.",
    p3_a: "Su álbum de 2024, ",
    p3_alma: "Alma Adentro: La Música de Sylvia Rexach y Tutti Umpierre",
    p3_b: " — una recreación fiel del álbum de 1958 ",
    p3_canta: "Sylvia Rexach Canta a Sylvia Rexach",
    p3_c: " — fue reconocido como uno de los 20 Álbumes Más Destacados de 2024 por la Fundación Nacional para la Cultura Popular. Como continuación, Maritzaida y Aaron lanzaron ",
    p3_otro: "El Otro Camino",
    p3_d: ", un EP con las cuatro canciones escritas por Rexach y Umpierre para la película homónima de 1959. Estas canciones, durante mucho tiempo ignoradas y nunca grabadas comercialmente por el dúo original, cobraron vida por primera vez en este proyecto — sirviendo como un poderoso precursor de la serie Radio Bohemia y profundizando el arco narrativo que ahora continúa con el Volumen Uno.",
    p4: "Acompañando a Maritzaida en la guitarra está su esposo y compañero musical de toda la vida, el Dr. Aaron Weibe, cuyo toque evoca la brillantez discreta de Tutti Umpierre. La sensibilidad natural de Aaron, su fraseo e instintos armónicos han llevado tanto a críticos como a la propia Sharon Riley Rexach a establecer llamativas comparaciones entre su trabajo en la guitarra y el de Umpierre. Más que imitación, su estilo se siente como una continuación intuitiva — marcada por una confianza silenciosa, una contención emocional y la capacidad de moldear el espacio alrededor de una canción sin nunca opacarla. Su acompañamiento ofrece una base firme y expresiva que permite que las letras de Rexach — y la voz de Maritzaida — vuelen.",
    p5: "Para enriquecer aún más la experiencia, el actor, director y educador puertorriqueño Robi Arce Martínez actúa como un ficticio locutor radial de los años 50, interpretando interludios guionizados que guían a los oyentes a través del álbum como si fuera una transmisión redescubierta. Su narración aporta calidez, encanto y textura histórica, potenciando la narrativa que conecta cada canción.",
    p6: "El punto emocional más alto del Volumen Uno llega en la pista final, \"Dios de Oro\", con la participación de Sharon Riley Rexach. Escrita por Sylvia Rexach en 1960 durante sus últimos días luchando contra el cáncer, \"Dios de Oro\" es una despedida inquietante que reflexiona sobre la vida, la muerte y la trascendencia. Sharon grabó la canción por primera vez hace más de 50 años con Tutti Umpierre, poco después del fallecimiento de su madre. Ahora, por primera vez desde aquella grabación original, regresa a esta pieza profundamente personal — prestando su voz y su corazón a una nueva interpretación junto a Maritzaida y Aaron. El resultado es una actuación única en su generación que une el tiempo, la memoria y la devoción.",
    p7: "Con lanzamiento previsto para el otoño de 2025, Radio Bohemia: Volumen Uno es más que un álbum — es un archivo vivo de la música bohemia de Puerto Rico, traído a la vida con reverencia y cuidado. Con su mezcla de composiciones raras, narración radial de época y colaboración intergeneracional, Radio Bohemia continúa la obra inconclusa de Sylvia Rexach y Tutti Umpierre — asegurando que sus voces, y sus canciones, sigan resonando hacia el futuro.",
    cta_listen: "Escuchar en YouTube ↗",
    cta_discography: "Discografía Completa",
    cta_about: "Sobre Maritzaida",
  },
};

export default function RadioBohemiaNewsContent() {
  const { lang } = useLang();
  const c = content[lang];

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
            {c.label}
          </p>
          <h1
            className="text-4xl md:text-6xl leading-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
          >
            {c.title}
          </h1>
          <p className="text-xl" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
            {c.subtitle}
          </p>
          <span className="divider-gold" />
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          <p>{c.p1}</p>
          <p>{c.p2}</p>
          <p>
            {c.p3_a}<em>{c.p3_alma}</em>{c.p3_b}<em>{c.p3_canta}</em>{c.p3_c}<em>{c.p3_otro}</em>{c.p3_d}
          </p>
          <p>{c.p4}</p>
          <p>{c.p5}</p>
          <p>{c.p6}</p>
          <p>{c.p7}</p>
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
            {c.cta_listen}
          </a>
          <Link
            href="/music"
            className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
            style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}
          >
            {c.cta_discography}
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}
          >
            {c.cta_about}
          </Link>
        </div>
      </article>
    </>
  );
}
