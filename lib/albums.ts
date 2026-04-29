export type Album = {
  title: string;
  subtitle?: string;
  year: string;
  image: string;
  description: { en: string; es: string };
  youtube: string;
  type: string;
  tags: string[];
  accolade?: string;
  credits?: string;
  availableDate?: string;
};

export const albums: Album[] = [
  {
    title: "Una Noche (En Vivo)",
    subtitle: "",
    year: "2026",
    image: "/albums/una-noche-en-vivo.png",
    description: {
      en: "A live recording celebrating the full arc of the Boleros Clásicos repertoire — Volúmenes I and II performed before a live audience.",
      es: "Una grabación en vivo que celebra el recorrido completo del repertorio de Boleros Clásicos — los Volúmenes I y II interpretados ante el público.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_ljxyKRqeN5RZjfwJsuDdoX3VCoL71jd-k",
    type: "Live Album",
    tags: ["Live", "Bolero", "Bolero Clásico", "Música Bohemia"],
    credits: "Voice · Guitar · Cuatro Puertorriqueño · Bass · Distributed by SideHustle Records",
    availableDate: "May 22nd, 2026",
  },
  {
    title: "Radio Bohemia Volumen I",
    subtitle: "La Música de Sylvia Rexach y Tutti Umpierre",
    year: "2025",
    image: "/albums/radio-bohemia-vol-1.png",
    description: {
      en: "Modeled after the legendary 1953 radio broadcasts of Sylvia Rexach and Tutti Umpierre, this album captures the warmth of those historic sessions. Features a guest appearance by Sharon Riley Rexach — Sylvia Rexach's daughter.",
      es: "Inspirado en las legendarias transmisiones radiales de 1953 de Sylvia Rexach y Tutti Umpierre, este álbum captura la calidez de aquellas históricas sesiones. Cuenta con la participación especial de Sharon Riley Rexach — hija de Sylvia Rexach.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_ld2cggMIv854TZcjDki39ZH9NJ2hhIwSc",
    type: "LP",
    tags: ["Música Bohemia", "Bolero", "Sylvia Rexach", "Tutti Umpierre", "Sharon Riley Rexach"],
    credits: "Distributed by SideHustle Records",
  },
  {
    title: "El Otro Camino",
    subtitle: "La Música de Sylvia Rexach y Tutti Umpierre",
    year: "2025",
    image: "/albums/el-otro-camino.jpg",
    description: {
      en: "A four-song EP that restores lost compositions from the 1959 film score — pieces silent for over six decades, finally given their rightful place.",
      es: "Un EP de cuatro canciones que restaura composiciones perdidas de la banda sonora del filme de 1959 — piezas en silencio por más de seis décadas, que finalmente ocupan el lugar que les corresponde.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_mFINFHCFYD9CYgI01xuQD9z3y-3xdTLD4",
    type: "EP",
    tags: ["Música Bohemia", "Bolero", "1959 Film Score"],
    credits: "Distributed by SideHustle Records",
  },
  {
    title: "Sentimientos En Vivo",
    subtitle: "",
    year: "2025",
    image: "/albums/sentimientos-en-vivo-front.jpg",
    description: {
      en: "Captured live, this recording features Rexach/Umpierre compositions alongside works by other beloved composers of the era.",
      es: "Grabado en vivo, este álbum presenta composiciones de Rexach/Umpierre junto a obras de otros queridos compositores de la época.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_lYZsA1qGueNXL34d68JWhRyO2QRhAOZvw",
    type: "LP",
    tags: ["Live", "Música Bohemia", "Bolero"],
    credits: "Voice · 7-string guitar · Cello · Distributed by SideHustle Records",
  },
  {
    title: "Alma Adentro",
    subtitle: "La Música de Sylvia Rexach y Tuti Umpierre",
    year: "2024",
    image: "/albums/alma-adentro-front.jpg",
    accolade: "#16 — Top 20 Most Outstanding Albums of 2024 · La Fundación Para La Cultura Popular de Puerto Rico",
    description: {
      en: "A recreation of the iconic 1958 Rexach/Umpierre album that defined an era of Puerto Rican music. Recognized as one of the most outstanding albums of 2024 in Puerto Rico.",
      es: "Una recreación del icónico álbum de Rexach/Umpierre de 1958 que definió una era de la música puertorriqueña. Reconocido como uno de los álbumes más destacados de 2024 en Puerto Rico.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_lF34Spj_Mvq46TOf3NxhHej3em5AmudBI",
    type: "LP",
    tags: ["Música Bohemia", "Bolero", "Sylvia Rexach"],
    credits: "Distributed by SideHustle Records",
  },
  {
    title: "Boleros Clásicos Volumen II",
    subtitle: "",
    year: "2023",
    image: "/albums/boleros-clasicos-vol-2.jpg",
    description: {
      en: "The second volume deepens the bolero tradition. Produced by Charlie Hunter and distributed through SideHustle Records.",
      es: "El segundo volumen profundiza en la tradición del bolero. Producido por Charlie Hunter y distribuido por SideHustle Records.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_lhpTBERXeXBZ9yk4UxfNrb8xESz00kZj4",
    type: "LP",
    tags: ["Bolero", "Bolero Clásico"],
    credits: "Produced by Charlie Hunter · SideHustle Records · Voice · Guitar · Cuatro Puertorriqueño · Bass",
  },
  {
    title: "Boleros Clásicos Volumen I",
    subtitle: "",
    year: "2023",
    image: "/albums/boleros-clasicos-vol-1.jpg",
    description: {
      en: "The debut that launched everything — a declaration of devotion to the bolero tradition. Produced by Charlie Hunter and distributed through SideHustle Records.",
      es: "El debut que lo inició todo — una declaración de devoción a la tradición del bolero. Producido por Charlie Hunter y distribuido por SideHustle Records.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k0Bai6ZQQa9Qir2Nxciyer3beTxxYwN8E",
    type: "LP",
    tags: ["Bolero", "Bolero Clásico"],
    credits: "Produced by Charlie Hunter · SideHustle Records · Voice · Guitar · Cuatro Puertorriqueño · Bass",
  },
  {
    title: "Lamento de Navidad",
    subtitle: "",
    year: "2024",
    image: "/albums/lamento-de-navidad.jpg",
    description: {
      en: "A holiday single written by Sylvia Rexach, steeped in the música bohemia tradition — melancholic, intimate, and deeply felt.",
      es: "Un sencillo navideño escrito por Sylvia Rexach, impregnado de la tradición de la música bohemia — melancólico, íntimo y profundamente sentido.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_mTomZZxNV6IrSmzuVwFg4WDxIc7F1gXA0",
    type: "Single",
    tags: ["Bolero", "Navidad"],
    credits: "Distributed by SideHustle Records",
  },
  {
    title: "Triste Navidad",
    subtitle: "",
    year: "2023",
    image: "/albums/triste-navidad.jpg",
    description: {
      en: "A seasonal single — a bolero take on the bittersweet nature of the holiday season.",
      es: "Un sencillo de temporada — una interpretación en bolero de la naturaleza agridulce de la época navideña.",
    },
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_l2xenGaB9ILqjs5ZIp2g2NX-n2wPWa8nw",
    type: "Single",
    tags: ["Bolero", "Navidad"],
    credits: "Distributed by SideHustle Records",
  },
];
