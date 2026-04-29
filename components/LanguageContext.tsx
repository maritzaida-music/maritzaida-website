"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.media": "Media",
    "nav.music": "Music",
    "nav.videos": "Videos",
    "nav.catalogo": "Bohemia Catalog",
    "nav.shows": "Shows",
    "nav.about": "About",
    "nav.epk": "EPK",
    "nav.contact": "Contact",

    // Footer
    "footer.tagline": "Música Bohemia & Bolero",
    "footer.rights": "All rights reserved.",

    // Home hero
    "home.genre": "Música Bohemia & Bolero",
    "home.hero.sub": "Puerto Rican vocalist preserving the timeless beauty of música bohemia — honoring the legendary works of Sylvia Rexach and Tutti Umpierre.",
    "home.hero.cta.music": "Discography",
    "home.hero.cta.shows": "Upcoming Shows",
    "home.hero.scroll": "Scroll",

    // Home sections
    "home.featured.label": "Latest Releases",
    "home.featured.heading": "Featured Music",
    "home.featured.cta": "View Full Discography",
    "home.listen": "Listen on YouTube ↗",

    "home.about.label": "About",
    "home.about.heading": "Preserving a Timeless Legacy",
    "home.about.p1": "Maritzaida is a Puerto Rican vocalist whose work centers on música bohemia and bolero — genres that carry the soul of Latin American culture. Together with her husband and guitarist AJ Weibe, her voice serves as a living bridge between the golden era of Puerto Rican music and the present day.",
    "home.about.p2": "Alongside her husband and through their recordings and live performances, they breathe new life into the masterworks of composer Sylvia Rexach and guitarist Tutti Umpierre — ensuring these irreplaceable compositions are heard by a new generation.",
    "home.about.cta": "Read Her Story →",

    "home.film.label": "Film",
    "home.film.heading": "A Little Family Drama",
    "home.film.p1": "Music from Boleros Clásicos Volumen Dos and Alma Adentro was selected by Steve Berlin — member of Los Lobos and music supervisor — for the film A Little Family Drama (2024), directed by Nadia Zoe.",
    "home.film.platforms": "Now available on Apple TV, Amazon Prime Video, and YouTube Movies.",
    "home.film.cta": "Watch Trailer ↗",

    "home.store.label": "Merch",
    "home.store.heading": "Shop Maritzaida",
    "home.store.cta": "Visit the Store ↗",

    "home.shows.label": "Live Performances",
    "home.shows.heading": "Upcoming Shows",
    "home.shows.cta": "All Shows",

    "home.quote": "Ranked among the Top 20 Most Outstanding Albums of 2024 — Alma Adentro arrived at #16.",
    "home.quote.source": "La Fundación Para La Cultura Popular de Puerto Rico, 2024",

    "home.booking.heading": "Book Maritzaida",
    "home.booking.sub": "Concert bookings and press inquiries",
    "home.booking.contact": "Get in Touch",
    "home.booking.epk": "EPK",

    // Music page
    "music.label": "Discography",
    "music.heading": "Music",
    "music.sub": "A growing body of work dedicated to música bohemia and bolero — the timeless genres that define the soul of Puerto Rico and Latin America.",
    "music.stream": "Stream on",
    "music.cta.shows.label": "Experience It Live",
    "music.cta.shows.heading": "See Maritzaida in Concert",
    "music.cta.shows": "Upcoming Shows",

    // Videos page
    "videos.label": "Watch",
    "videos.heading": "Videos",
    "videos.sub": "Music videos, live performances, and visual stories from Maritzaida's world of música bohemia and bolero.",
    "videos.featured": "Featured",
    "videos.all": "All Videos",
    "videos.channel": "YouTube Channel ↗",
    "videos.channel.sub": "Subscribe for new music videos and live performances",

    // Shows page
    "shows.label": "Live",
    "shows.heading": "Shows",
    "shows.sub": "Experience música bohemia and bolero live — intimate, timeless, and unforgettable.",
    "shows.booking.label": "Bookings",
    "shows.booking.heading": "Bring Maritzaida to Your Stage",
    "shows.booking.body": "Available for concerts, cultural events, and festivals. Contact us to discuss booking for your venue or event.",
    "shows.booking.cta": "Booking Inquiry",
    "shows.type.concert": "Concert Performances",
    "shows.type.festival": "Cultural Festivals",
    "shows.type.education": "Educational Programs",

    // About page
    "about.label": "Their Story",
    "about.heading": "About",
    "about.bio.heading": "A Voice. A Guitar. An Irreplaceable Art.",
    "about.bio.p1": "Maritzaida is a Puerto Rican vocalist dedicated to música bohemia and bolero. Together with her husband and guitarist AJ Weibe — who serves as her guitarist, arranger, producer, and musical companion — she has built a body of work centered on preserving the songs of Sylvia Rexach and guitarist Tutti Umpierre.",
    "about.bio.p2": "Tutti Umpierre's guitar style — its harmonic intimacy, its melodic sensitivity — is inseparable from the sound of Sylvia Rexach's compositions. AJ Weibe has devoted himself to understanding and honoring that style in every recording.",
    "about.bio.p3": "Their debut recordings, Boleros Clásicos Volumen I and Volumen II, were produced by guitarist Charlie Hunter and released through SideHustle Records. Their 2024 album Alma Adentro was recognized as one of the Top 20 Most Outstanding Albums of 2024 by La Fundación Para La Cultura Popular de Puerto Rico. Maritzaida is a 2026 grantee of the Arts Council of Greater Greensboro.",
    "about.sharon.label": "A Living Connection",
    "about.sharon.heading": "Sharon Riley Rexach",
    "about.sharon.p": "Sharon Riley Rexach, the daughter of Sylvia Rexach, has become a meaningful part of this project. Her guest appearance on Radio Bohemia Volumen I connects the music directly to the family that created it — a collaboration that speaks for itself.",
    "about.rexach.label": "The Legacy",
    "about.rexach.heading": "Sylvia Rexach & Tutti Umpierre",
    "about.rexach.p1": "Sylvia Rexach (1922–1961) was a Puerto Rican poet, composer, and bohemian spirit who wrote some of the most tender and psychologically complex love songs in the Spanish-language canon. Her collaborator, guitarist Tutti Umpierre, provided the melodic and harmonic framework that made those songs iconic.",
    "about.rexach.p2": "Their recordings — many made in the 1950s — were intimate documents of a particular Puerto Rican spirit: sophisticated, melancholic, and alive with beauty. Some of those recordings were lost. Some compositions went unrecorded for decades. Maritzaida and AJ have committed their work to recovering, interpreting, and amplifying every note they can find.",
    "about.milestones": "Milestones",
    "about.milestone.boleros.desc": "Debut recordings produced by Charlie Hunter, released through SideHustle Records. Two volumes that announced a singular new voice in Latin music.",
    "about.milestone.alma.desc": "Recreation of the iconic 1958 Rexach/Umpierre album. Ranked #16 on the Top 20 Most Outstanding Albums of 2024 in Puerto Rico.",
    "about.milestone.sentimientos.desc": "Live album featuring Rexach/Umpierre compositions and tributes to other composers of the era.",
    "about.milestone.otrocamino.desc": "Restored lost compositions from the 1959 film score — silent for over six decades.",
    "about.milestone.radiobohemia.desc": "Modeled after the 1953 radio broadcasts. Sharon Riley Rexach — Sylvia's daughter — joins as a guest.",
    "about.milestone.unanoche.desc": "A live celebration of the full Boleros Clásicos repertoire, capturing Maritzaida and AJ Weibe in concert.",
    "about.cta.discography": "Discography",
    "about.cta.epk": "Electronic Press Kit",
    "about.cta.contact": "Book Maritzaida",

    // EPK page
    "epk.label": "Press & Media",
    "epk.heading": "Electronic Press Kit",
    "epk.sub": "For press inquiries, media coverage, and booking. All assets available for editorial use.",
    "epk.booking.cta": "Booking Inquiry",
    "epk.artist.label": "Artist",
    "epk.overview.genre": "Genre",
    "epk.overview.origin": "Origin",
    "epk.overview.since": "Active Since",
    "epk.overview.specialty": "Specialty",
    "epk.overview.instagram": "Instagram",
    "epk.overview.releases": "Releases",
    "epk.bio.heading": "Short Bio (for programs & press)",
    "epk.bio.text": "Maritzaida is a Puerto Rican vocalist dedicated to the art of música bohemia and bolero. Alongside her husband and guitarist AJ Weibe, her work centers on preserving and reinterpreting the masterworks of composer Sylvia Rexach and guitarist Tutti Umpierre — two of Puerto Rico's most beloved musical figures. Since 2023, Maritzaida has released seven albums and EPs, culminating in the critically recognized Alma Adentro (2024), ranked #16 on the Top 20 Most Outstanding Albums of 2024 by La Fundación Para La Cultura Popular de Puerto Rico. Her 2025 album Radio Bohemia Volumen I features a guest appearance by Sharon Riley Rexach, daughter of Sylvia Rexach, and is modeled after the iconic 1953 radio broadcasts that defined an era.",
    "epk.photo.label": "Press Photo",
    "epk.photo.caption": "High-res press photos available upon request — contact us below.",
    "epk.film.label": "Film",
    "epk.film.text": "Music from Boleros Clásicos Volumen Dos and Alma Adentro: La Música de Sylvia Rexach y Tuti Umpierre was selected by Steve Berlin — member of Los Lobos and music supervisor — for the film A Little Family Drama (2024), directed by Nadia Zoe. The film is currently available on Apple TV, Amazon Prime Video, and YouTube Movies.",
    "epk.film.cta": "Watch Trailer ↗",
    "epk.press.label": "Press",
    "epk.press.heading": "In the Press",
    "epk.discog.label": "Releases",
    "epk.discog.heading": "Discography",
    "epk.discog.cta": "Full Discography →",
    "epk.photos.label": "Media",
    "epk.photos.heading": "Press Photos",
    "epk.photos.caption": "Click any photo to view full size and download. Additional album artwork available upon request.",
    "epk.contact.label": "Bookings & Press",
    "epk.contact.heading": "Get in Touch",
    "epk.contact.body": "For concert bookings, press inquiries, media requests, and high-resolution photo access, reach out by email.",
    "epk.email.cta": "Email for Booking",

    // Contact page
    "contact.label": "Reach Out",
    "contact.heading": "Contact",
    "contact.sub": "For concert bookings and press inquiries.",
    "contact.bookings": "Booking & Inquiries",
    "contact.concerts.heading": "Concert Bookings",
    "contact.concerts.body": "Maritzaida performs música bohemia and bolero programs for concert halls, cultural institutions, festivals, and theaters. Full band or intimate duo configurations available.",
    "contact.press.heading": "Press & Media",
    "contact.press.body": "For interviews, editorial features, and press photo requests, email us directly.",
    "contact.email.label": "Email",
    "contact.email.prompt": "Send us a message directly and we'll get back to you as soon as possible.",
    "contact.follow": "Follow",

    // Bohemia Catalog page
    "catalogo.label": "Recordings",
    "catalogo.heading": "Bohemia Catalog",
    "catalogo.sub": "The recorded catalog of compositions by Sylvia Rexach and Tutti Umpierre as preserved by Maritzaida and AJ Weibe — gathered across albums, EPs, and live recordings.",
    "catalogo.context.p1": "Sylvia Rexach (1922–1961) was a Puerto Rican poet and composer whose music defined the soul of música bohemia. Her collaboration with guitarist Tutti Umpierre produced some of the most tender and enduring songs in the Spanish-language canon. Some of those recordings were lost. Some compositions went unrecorded for decades.",
    "catalogo.context.p2": "Maritzaida and AJ Weibe have committed their work to recovering, interpreting, and amplifying every note they can find. This is the catalog of what they have recorded so far.",
    "catalogo.sharon.label": "Also In This Catalog",
    "catalogo.sharon.sub": "Sharon Riley Rexach & Tutti Umpierre · 1971 · Remastered for digital release by AJ Weibe",
    "catalogo.sharon.cta": "Read the Story →",
    "catalogo.listen": "Listen on YouTube ↗",
    "catalogo.cta.discography": "Full Discography",
    "catalogo.cta.about": "About Maritzaida",

    // Sharon Riley Rexach page
    "sharon.label": "A Lost Treasure Returns",
    "sharon.album.heading": "The Album",
    "sharon.story.p1": "In 1971 — a decade after the passing of her mother, Sylvia Rexach — Sharon Riley Rexach recorded an album in her mother's honor alongside guitarist Tutti Umpierre, Sylvia's longtime musical collaborator. The album, Sylvia Rexach en la Voz de Sharon Riley, preserved some of Sylvia's most intimate compositions as interpreted by her own daughter — the voice of a daughter honoring her mother's music through the hands of the guitarist who helped create it.",
    "sharon.story.p2": "For decades the album remained largely out of reach — a fire destroyed the master recordings and most of the remaining vinyl copies, leaving only a handful of survivors in existence. It became a piece of living history known to devoted collectors and scholars of Puerto Rican music but unavailable to the wider world.",
    "sharon.story.p3": "AJ Weibe served as the remastering engineer for the digital release — honored to work alongside the recordings of his favorite guitarist, Tutti Umpierre. Together with Maritzaida, whose own recordings are devoted to this same legacy, they brought the album into the digital era for the first time, making it accessible to listeners everywhere.",
    "sharon.story.p4": "That Sharon Riley Rexach later appeared as a guest on Maritzaida's own album Radio Bohemia Volumen I speaks to the depth of the connection that has grown around this shared devotion to Sylvia's music.",
    "sharon.listen": "Listen on YouTube ↗",
    "sharon.about": "About Maritzaida",
    "sharon.caption": "Maritzaida with Sharon Riley Rexach",
    "sharon.artists.heading": "The Artists",
    "sharon.sylvia.years": "1922–1961",
    "sharon.sylvia.desc": "Poet, composer, and one of Puerto Rico's most beloved musical figures. She wrote the songs that define the música bohemia tradition — intimate, emotionally direct, and quietly extraordinary.",
    "sharon.sharon.years": "Daughter of Sylvia Rexach",
    "sharon.sharon.desc": "Sharon carried her mother's music forward, recording this album in 1971 as a personal act of devotion. Decades later, she appeared as a guest on Maritzaida's Radio Bohemia Volumen I.",
    "sharon.tutti.years": "Guitarist",
    "sharon.tutti.desc": "Sylvia Rexach's principal collaborator, whose guitar style is inseparable from the sound of her compositions. He played on the original recordings and returned to play alongside Sharon for this 1971 tribute.",
    "sharon.cta.discography": "Maritzaida's Discography",
    "sharon.cta.catalog": "Bohemia Catalog",
    "sharon.cta.epk": "Press Kit",

    // Language selector
    "lang.prompt": "Choose your language",
    "lang.en": "English",
    "lang.es": "Español",
    "lang.continue": "Continue",
  },

  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.media": "Media",
    "nav.music": "Música",
    "nav.videos": "Videos",
    "nav.catalogo": "Catálogo Bohemio",
    "nav.shows": "Conciertos",
    "nav.about": "Acerca de",
    "nav.epk": "EPK",
    "nav.contact": "Contacto",

    // Footer
    "footer.tagline": "Música Bohemia & Bolero",
    "footer.rights": "Todos los derechos reservados.",

    // Home hero
    "home.genre": "Música Bohemia & Bolero",
    "home.hero.sub": "Vocalista puertorriqueña que preserva la belleza atemporal de la música bohemia — honrando la obra legendaria de Sylvia Rexach y Tutti Umpierre.",
    "home.hero.cta.music": "Discografía",
    "home.hero.cta.shows": "Próximos Conciertos",
    "home.hero.scroll": "Desplazar",

    // Home sections
    "home.featured.label": "Últimos Lanzamientos",
    "home.featured.heading": "Música Destacada",
    "home.featured.cta": "Ver Discografía Completa",
    "home.listen": "Escuchar en YouTube ↗",

    "home.about.label": "Acerca de",
    "home.about.heading": "Preservando un Legado Atemporal",
    "home.about.p1": "Maritzaida es una vocalista puertorriqueña cuyo trabajo se centra en la música bohemia y el bolero — géneros que llevan el alma de la cultura latinoamericana. Junto a su esposo y guitarrista AJ Weibe, su voz sirve de puente vivo entre la era dorada de la música puertorriqueña y el presente.",
    "home.about.p2": "Junto a su esposo y a través de sus grabaciones y actuaciones en vivo, dan nueva vida a las obras maestras de la compositora Sylvia Rexach y el guitarrista Tutti Umpierre — asegurando que estas composiciones insustituibles sean escuchadas por una nueva generación.",
    "home.about.cta": "Leer su Historia →",

    "home.film.label": "Cine",
    "home.film.heading": "A Little Family Drama",
    "home.film.p1": "Música de Boleros Clásicos Volumen Dos y Alma Adentro fue seleccionada por Steve Berlin — miembro de Los Lobos y supervisor musical — para el filme A Little Family Drama (2024), dirigido por Nadia Zoe.",
    "home.film.platforms": "Disponible en Apple TV, Amazon Prime Video y YouTube Movies.",
    "home.film.cta": "Ver Tráiler ↗",

    "home.store.label": "Tienda",
    "home.store.heading": "Tienda de Maritzaida",
    "home.store.cta": "Visitar la Tienda ↗",

    "home.shows.label": "Actuaciones en Vivo",
    "home.shows.heading": "Próximos Conciertos",
    "home.shows.cta": "Todos los Conciertos",

    "home.quote": "Clasificada entre los 20 Álbumes Más Destacados de 2024 — Alma Adentro llegó al puesto #16.",
    "home.quote.source": "La Fundación Para La Cultura Popular de Puerto Rico, 2024",

    "home.booking.heading": "Contratar a Maritzaida",
    "home.booking.sub": "Reservas para conciertos y consultas de prensa",
    "home.booking.contact": "Contáctanos",
    "home.booking.epk": "EPK",

    // Music page
    "music.label": "Discografía",
    "music.heading": "Música",
    "music.sub": "Una obra creciente dedicada a la música bohemia y el bolero — los géneros atemporales que definen el alma de Puerto Rico y América Latina.",
    "music.stream": "Escuchar en",
    "music.cta.shows.label": "Experiencia en Vivo",
    "music.cta.shows.heading": "Ver a Maritzaida en Concierto",
    "music.cta.shows": "Próximos Conciertos",

    // Videos page
    "videos.label": "Ver",
    "videos.heading": "Videos",
    "videos.sub": "Videos musicales, actuaciones en vivo e historias visuales del mundo de música bohemia y bolero de Maritzaida.",
    "videos.featured": "Destacado",
    "videos.all": "Todos los Videos",
    "videos.channel": "Canal de YouTube ↗",
    "videos.channel.sub": "Suscríbete para nuevos videos musicales y actuaciones en vivo",

    // Shows page
    "shows.label": "En Vivo",
    "shows.heading": "Conciertos",
    "shows.sub": "Vive la música bohemia y el bolero en directo — íntimo, atemporal e inolvidable.",
    "shows.booking.label": "Reservas",
    "shows.booking.heading": "Lleva a Maritzaida a Tu Escenario",
    "shows.booking.body": "Disponible para conciertos, eventos culturales y festivales. Contáctanos para hablar sobre la reserva para tu lugar o evento.",
    "shows.booking.cta": "Solicitar Reserva",
    "shows.type.concert": "Actuaciones en Concierto",
    "shows.type.festival": "Festivales Culturales",
    "shows.type.education": "Programas Educativos",

    // About page
    "about.label": "Su Historia",
    "about.heading": "Acerca de",
    "about.bio.heading": "Una Voz. Una Guitarra. Un Arte Irreemplazable.",
    "about.bio.p1": "Maritzaida es una vocalista puertorriqueña dedicada a la música bohemia y el bolero. Junto a su esposo y guitarrista AJ Weibe — quien actúa como su guitarrista, arreglista, productor y compañero musical — ha construido una obra centrada en la preservación de las canciones de Sylvia Rexach y el guitarrista Tutti Umpierre.",
    "about.bio.p2": "El estilo guitarrístico de Tutti Umpierre — su intimidad armónica, su sensibilidad melódica — es inseparable del sonido de las composiciones de Sylvia Rexach. AJ Weibe se ha dedicado a comprender y honrar ese estilo en cada grabación.",
    "about.bio.p3": "Sus primeras grabaciones, Boleros Clásicos Volumen I y Volumen II, fueron producidas por el guitarrista Charlie Hunter y lanzadas a través de SideHustle Records. Su álbum de 2024 Alma Adentro fue reconocido como uno de los 20 Álbumes Más Destacados de 2024 por La Fundación Para La Cultura Popular de Puerto Rico. Maritzaida es becaria del Consejo de las Artes del Gran Greensboro en 2026.",
    "about.sharon.label": "Una Conexión Viva",
    "about.sharon.heading": "Sharon Riley Rexach",
    "about.sharon.p": "Sharon Riley Rexach, hija de Sylvia Rexach, se ha convertido en una parte significativa de este proyecto. Su aparición como invitada en Radio Bohemia Volumen I conecta la música directamente con la familia que la creó — una colaboración que habla por sí sola.",
    "about.rexach.label": "El Legado",
    "about.rexach.heading": "Sylvia Rexach & Tutti Umpierre",
    "about.rexach.p1": "Sylvia Rexach (1922–1961) fue una poeta, compositora y espíritu bohemio puertorriqueño que escribió algunas de las canciones de amor más tiernas y psicológicamente complejas del canon hispanohablante. Su colaborador, el guitarrista Tutti Umpierre, proporcionó el marco melódico y armónico que hizo icónicas aquellas canciones.",
    "about.rexach.p2": "Sus grabaciones — muchas realizadas en la década de 1950 — fueron documentos íntimos de un espíritu puertorriqueño particular: sofisticado, melancólico y lleno de belleza. Algunas de esas grabaciones se perdieron. Algunas composiciones quedaron sin grabar durante décadas. Maritzaida y AJ han comprometido su trabajo a recuperar, interpretar y amplificar cada nota que puedan encontrar.",
    "about.milestones": "Hitos",
    "about.milestone.boleros.desc": "Primeras grabaciones producidas por Charlie Hunter, lanzadas a través de SideHustle Records. Dos volúmenes que anunciaron una voz nueva y singular en la música latina.",
    "about.milestone.alma.desc": "Recreación del icónico álbum de 1958 de Rexach/Umpierre. Clasificado #16 en los 20 Álbumes Más Destacados de 2024 en Puerto Rico.",
    "about.milestone.sentimientos.desc": "Álbum en vivo con composiciones de Rexach/Umpierre y homenajes a otros compositores de la época.",
    "about.milestone.otrocamino.desc": "Composiciones perdidas restauradas de la banda sonora del filme de 1959 — en silencio por más de seis décadas.",
    "about.milestone.radiobohemia.desc": "Inspirado en las transmisiones radiales de 1953. Sharon Riley Rexach — hija de Sylvia — se une como invitada.",
    "about.milestone.unanoche.desc": "Una celebración en vivo del repertorio completo de Boleros Clásicos, capturando a Maritzaida y AJ Weibe en concierto.",
    "about.cta.discography": "Discografía",
    "about.cta.epk": "Kit de Prensa Electrónico",
    "about.cta.contact": "Contratar a Maritzaida",

    // EPK page
    "epk.label": "Prensa y Medios",
    "epk.heading": "Kit de Prensa Electrónico",
    "epk.sub": "Para consultas de prensa, cobertura mediática y reservas. Todos los recursos disponibles para uso editorial.",
    "epk.booking.cta": "Solicitar Reserva",
    "epk.artist.label": "Artista",
    "epk.overview.genre": "Género",
    "epk.overview.origin": "Origen",
    "epk.overview.since": "Activo Desde",
    "epk.overview.specialty": "Especialidad",
    "epk.overview.instagram": "Instagram",
    "epk.overview.releases": "Lanzamientos",
    "epk.bio.heading": "Biografía Corta (para programas y prensa)",
    "epk.bio.text": "Maritzaida es una vocalista puertorriqueña dedicada al arte de la música bohemia y el bolero. Junto a su esposo y guitarrista AJ Weibe, su trabajo se centra en preservar y reinterpretar las obras maestras de la compositora Sylvia Rexach y el guitarrista Tutti Umpierre — dos de las figuras musicales más queridas de Puerto Rico. Desde 2023, Maritzaida ha lanzado siete álbumes y EPs, culminando con el reconocido Alma Adentro (2024), clasificado #16 entre los 20 Álbumes Más Destacados de 2024 por La Fundación Para La Cultura Popular de Puerto Rico. Su álbum de 2025 Radio Bohemia Volumen I cuenta con la participación especial de Sharon Riley Rexach, hija de Sylvia Rexach, y está inspirado en las icónicas transmisiones radiales de 1953 que definieron una era.",
    "epk.photo.label": "Foto de Prensa",
    "epk.photo.caption": "Fotos de prensa en alta resolución disponibles bajo pedido — contáctanos a continuación.",
    "epk.film.label": "Cine",
    "epk.film.text": "Música de Boleros Clásicos Volumen Dos y Alma Adentro: La Música de Sylvia Rexach y Tuti Umpierre fue seleccionada por Steve Berlin — miembro de Los Lobos y supervisor musical — para el filme A Little Family Drama (2024), dirigido por Nadia Zoe. El filme está disponible actualmente en Apple TV, Amazon Prime Video y YouTube Movies.",
    "epk.film.cta": "Ver Tráiler ↗",
    "epk.press.label": "Prensa",
    "epk.press.heading": "En la Prensa",
    "epk.discog.label": "Lanzamientos",
    "epk.discog.heading": "Discografía",
    "epk.discog.cta": "Discografía Completa →",
    "epk.photos.label": "Medios",
    "epk.photos.heading": "Fotos de Prensa",
    "epk.photos.caption": "Haz clic en cualquier foto para ver en tamaño completo y descargar. Arte adicional del álbum disponible bajo pedido.",
    "epk.contact.label": "Reservas y Prensa",
    "epk.contact.heading": "Contáctanos",
    "epk.contact.body": "Para reservas de conciertos, consultas de prensa, solicitudes de medios y acceso a fotos de alta resolución, contáctanos por correo electrónico.",
    "epk.email.cta": "Correo para Reservas",

    // Contact page
    "contact.label": "Contáctanos",
    "contact.heading": "Contacto",
    "contact.sub": "Para reservas de conciertos y consultas de prensa.",
    "contact.bookings": "Reservas y Consultas",
    "contact.concerts.heading": "Reservas de Conciertos",
    "contact.concerts.body": "Maritzaida presenta programas de música bohemia y bolero en salas de conciertos, instituciones culturales, festivales y teatros. Configuraciones de banda completa o dúo íntimo disponibles.",
    "contact.press.heading": "Prensa y Medios",
    "contact.press.body": "Para entrevistas, reportajes editoriales y solicitudes de fotos de prensa, escríbenos directamente.",
    "contact.email.label": "Correo",
    "contact.email.prompt": "Envíanos un mensaje directamente y te responderemos lo antes posible.",
    "contact.follow": "Seguir",

    // Bohemia Catalog page
    "catalogo.label": "Grabaciones",
    "catalogo.heading": "Catálogo Bohemio",
    "catalogo.sub": "El catálogo grabado de composiciones de Sylvia Rexach y Tutti Umpierre conservado por Maritzaida y AJ Weibe — reunido en álbumes, EPs y grabaciones en vivo.",
    "catalogo.context.p1": "Sylvia Rexach (1922–1961) fue una poeta y compositora puertorriqueña cuya música definió el alma de la música bohemia. Su colaboración con el guitarrista Tutti Umpierre produjo algunas de las canciones más tiernas y perdurables del canon hispanohablante. Algunas de esas grabaciones se perdieron. Algunas composiciones quedaron sin grabar durante décadas.",
    "catalogo.context.p2": "Maritzaida y AJ Weibe han comprometido su trabajo a recuperar, interpretar y amplificar cada nota que puedan encontrar. Este es el catálogo de lo que han grabado hasta ahora.",
    "catalogo.sharon.label": "También en Este Catálogo",
    "catalogo.sharon.sub": "Sharon Riley Rexach & Tutti Umpierre · 1971 · Remasterizado para lanzamiento digital por AJ Weibe",
    "catalogo.sharon.cta": "Leer la Historia →",
    "catalogo.listen": "Escuchar en YouTube ↗",
    "catalogo.cta.discography": "Discografía Completa",
    "catalogo.cta.about": "Acerca de Maritzaida",

    // Sharon Riley Rexach page
    "sharon.label": "Un Tesoro Perdido Regresa",
    "sharon.album.heading": "El Álbum",
    "sharon.story.p1": "En 1971 — una década después del fallecimiento de su madre, Sylvia Rexach — Sharon Riley Rexach grabó un álbum en honor a su madre junto al guitarrista Tutti Umpierre, el colaborador musical de toda la vida de Sylvia. El álbum, Sylvia Rexach en la Voz de Sharon Riley, preservó algunas de las composiciones más íntimas de Sylvia interpretadas por su propia hija — la voz de una hija que honra la música de su madre a través de las manos del guitarrista que ayudó a crearla.",
    "sharon.story.p2": "Durante décadas el álbum permaneció en gran medida fuera del alcance — un incendio destruyó las grabaciones maestras y la mayoría de las copias en vinilo restantes, dejando solo un puñado de supervivientes. Se convirtió en una pieza de historia viva conocida por coleccionistas devotos y estudiosos de la música puertorriqueña, pero inaccesible para el mundo en general.",
    "sharon.story.p3": "AJ Weibe fungió como ingeniero de remasterización para el lanzamiento digital — honrado de trabajar junto a las grabaciones de su guitarrista favorito, Tutti Umpierre. Junto a Maritzaida, cuyas propias grabaciones están dedicadas a este mismo legado, llevaron el álbum a la era digital por primera vez, haciéndolo accesible a oyentes de todo el mundo.",
    "sharon.story.p4": "Que Sharon Riley Rexach luego apareciera como invitada en el propio álbum de Maritzaida, Radio Bohemia Volumen I, habla de la profundidad de la conexión que ha crecido en torno a esta devoción compartida por la música de Sylvia.",
    "sharon.listen": "Escuchar en YouTube ↗",
    "sharon.about": "Acerca de Maritzaida",
    "sharon.caption": "Maritzaida con Sharon Riley Rexach",
    "sharon.artists.heading": "Los Artistas",
    "sharon.sylvia.years": "1922–1961",
    "sharon.sylvia.desc": "Poeta, compositora y una de las figuras musicales más queridas de Puerto Rico. Escribió las canciones que definen la tradición de la música bohemia — íntimas, emocionalmente directas y silenciosamente extraordinarias.",
    "sharon.sharon.years": "Hija de Sylvia Rexach",
    "sharon.sharon.desc": "Sharon llevó adelante la música de su madre, grabando este álbum en 1971 como un acto personal de devoción. Décadas después, apareció como invitada en Radio Bohemia Volumen I de Maritzaida.",
    "sharon.tutti.years": "Guitarrista",
    "sharon.tutti.desc": "El principal colaborador de Sylvia Rexach, cuyo estilo guitarrístico es inseparable del sonido de sus composiciones. Tocó en las grabaciones originales y regresó para tocar junto a Sharon en este homenaje de 1971.",
    "sharon.cta.discography": "Discografía de Maritzaida",
    "sharon.cta.catalog": "Catálogo Bohemio",
    "sharon.cta.epk": "Kit de Prensa",

    // Language selector
    "lang.prompt": "Elige tu idioma",
    "lang.en": "English",
    "lang.es": "Español",
    "lang.continue": "Continuar",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("maritzaida-lang") as Lang | null;
    if (stored === "en" || stored === "es") setLangState(stored);
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("maritzaida-lang", l);
  };

  const t = (key: string): string =>
    translations[lang][key] ?? translations["en"][key] ?? key;

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
