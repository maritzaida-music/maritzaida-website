"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

const content = {
  en: {
    forImmediateRelease: "For Immediate Release",
    headline: "One Family. Four Generations. One Mission to Preserve Puerto Rican Música Bohemia.",
    subheadline: "Released on the 65th anniversary of Sylvia Rexach's death, Radio Bohemia Volumen II brings together her family and musicians Maritzaida and AJ Weibe in an ambitious effort to preserve the authentic sound of Puerto Rican Música Bohemia.",
    presave: "Pre-Save the Album",
    preorder: "Pre-Order the CD",
    releaseDate: "October 20, 2026",
    releaseDateLabel: "Release Date",
    label: "SideHustle Records",
    labelLabel: "Label",
    continueToSite: "Continue to maritzaida.com",

    p1: "GREENSBORO, N.C. — On October 20, 2026, the 65th anniversary of Sylvia Rexach's death, husband-and-wife artists Maritzaida and AJ Weibe will release Radio Bohemia Volumen II on SideHustle Records, the culmination of a multiyear collaboration with Rexach's family to preserve one of Puerto Rico's most treasured musical traditions.",
    p2: "More than an album, Radio Bohemia Volumen II is a historical preservation project. Developed in close collaboration with the Rexach family, it brings together archival research, family guidance, historically informed performance and analog recording techniques to recreate the intimate sound, artistic spirit and storytelling of Puerto Rican Música Bohemia as audiences would have experienced it during the 1950s and 1960s.",
    p3: "Puerto Rican Música Bohemia is a distinct musical tradition shaped by intimate vocals, poetic songwriting and sophisticated guitar accompaniment. Emerging from Puerto Rico's mid-20th-century radio programs, clubs and late-night gatherings, the style brought together elements of bolero, canción and filin while developing its own recognizable language of interpretation, harmony and storytelling. Rexach and Umpierre were among the artists who gave that tradition its defining voice.",
    p4: "Released on the anniversary of Rexach's death, the album stands as both a remembrance of one of Puerto Rico's most important songwriters and a celebration of the extraordinary artistic partnership she shared with guitarist, arranger, composer and collaborator Tutti Umpierre.",
    p5_before: "Across five releases",
    p5_link: "https://www.maritzaida.com/music",
    p5_after: "—Alma Adentro in 2024, Sentimientos En Vivo, El Otro Camino and Radio Bohemia Volumen I in 2025, and Radio Bohemia Volumen II in 2026—Maritzaida and AJ Weibe have recorded 45 compositions by Rexach and Umpierre. The collection is believed to be the largest body of their music recorded by a single artist.",

    s1heading: "Recreating the Radio Programs of 1953",
    s1p1: "Featuring 21 songs presented across 27 tracks, Radio Bohemia Volumen II recreates the atmosphere of the original 1953 radio programs featuring Rexach and Umpierre.",
    s1p2: "Live musical performances are interwoven with narration and period-inspired radio segments, creating the sensation of tuning into an intimate late-night broadcast in which music, poetry and conversation unfold together.",
    s1p3: "Every musical performance was recorded live around a single stereo ribbon microphone. Rather than constructing the songs instrument by instrument through modern studio production, Maritzaida and Weibe performed across from one another in the same room, embracing the warmth, spontaneity and natural balance that defined Puerto Rican Música Bohemia.",
    s1p4: "The project was designed to preserve not only the compositions, but also the musical language, performance traditions and cultural atmosphere from which they emerged.",

    s2heading: "A Collaboration With Sylvia Rexach's Family",
    s2p1_before: "The journey began following the 2024 release of ",
    s2p1_alma: "Alma Adentro",
    s2p1_after: ", when Maritzaida and AJ Weibe were introduced to Sharon Riley Rexach, Sylvia Rexach's daughter. ",
    s2p1_alma2: "Alma Adentro",
    s2p1_end: " was a recreation of the iconic 1958 album by Sylvia Rexach and Tutti Umpierre, Sylvia Canta a Sylvia Rexach.",
    s2p2: "What began as a conversation quickly became a friendship and a shared commitment to preserving the music of Rexach and Umpierre.",
    s2p3_before: "That collaboration deepened over the following years. Sharon appeared as a featured guest artist on ",
    s2p3_rbv1: "Radio Bohemia Volumen I",
    s2p3_middle: ", performing ",
    s2p3_dios: "Dios de Oro",
    s2p3_after: " approximately 50 years after recording it with Umpierre on her own debut album.",
    s2p4_before: "AJ Weibe later restored and remastered Sharon's historic recordings with Umpierre from vinyl, ",
    s2p4_sharon: "Sylvia Rexach En La Voz de Sharon Riley",
    s2p4_sharon_link: "/sharon-riley-rexach",
    s2p4_after: ", preparing the album for its first digital release and preserving another important chapter of Puerto Rican musical history.",
    s2p5_before: "For ",
    s2p5_rbv2: "Radio Bohemia Volumen II",
    s2p5_after: ", Sharon once again served as the project's principal musical advisor, working closely with Maritzaida and Weibe on every composition. Together, they examined each song in remarkable detail, discussing vocal interpretation, pronunciation, phrasing, tempo, harmony, emotional character and the artistic intentions behind the original performances.",
    s2p6: "Relatively few historical recordings exist for much of the repertoire, and many of the compositions have never been widely revisited by contemporary artists. Rather than relying exclusively on the surviving recordings, Maritzaida and Weibe sought to learn from the living tradition preserved within the Rexach family.",
    q1: `\u201CI never imagined, just a few years ago, that my life would become so intertwined with the music of Sylvia Rexach and Tutti Umpierre,\u201D Maritzaida said. \u201CThis has become the most meaningful artistic journey of my life. As a Puerto Rican, it has been an incredible privilege to help preserve a part of our musical heritage, and I am deeply grateful to Sharon and her family for welcoming us into that work. I am equally grateful to have shared this journey with my husband, AJ. Together, we have tried to honor it with the respect, love and care it deserves.\u201D`,
    s2p7: "Maritzaida brings the repertoire to life through her vocal interpretations. Weibe served as producer, arranger, guitarist, recording engineer, and mastering engineer.",
    s2p8: "Each arrangement evolved through years of study, informed by conversations with Sharon and a close examination of the surviving recordings of Rexach and Umpierre.",
    q2: `"It is one thing to perform these songs," Weibe said. "It is another thing to understand how they were meant to be communicated. Sharon helped us understand how Sylvia shaped a phrase, how she communicated emotion and how Tutti's guitar became part of that conversation. Every arrangement on this album grew out of those discussions."`,

    sharonQuote: `This great project holds an immense significance for me. A work where the love of music united families, friends, and loved ones with so much feeling. It is like the musical and life friendship of my mother, Sylvia Rexach, with Tutti Umpierre — one of the most important in Puerto Rican bohemia, the inspiration for an entire generation of bolero singers. Sylvia and Tutti were pure bohemia: two friends, a couple of drinks, a studio, and a guitar were enough to fulfill the need to immortalize their songs. <em style="font-style:normal">Sylvia Rexach Sings Sylvia Rexach</em>, recorded at Antonio Ochoa's studios in 1958. Perhaps it was a musical instinct for self-preservation, or the beginning of the ending we know — but that we continue to protect so that her light does not go out, so that her music continues to transcend, defying the fleeting nature of life and connecting with our emotions across generations.`,
    sharonQuoteEn: null,
    sharonAttrib: "Sharon Riley Rexach",
    sharonAttribSub: "Daughter of Sylvia Rexach",

    s3heading: "Four Generations of the Rexach Family",
    s3p1_before: `Radio Bohemia Volumen II brings together four generations connected through Sylvia Rexach's family. Sharon Riley Rexach served as the album's principal musical advisor, while her sister, Sylvia Eileen "Chivín" Riley, is represented through her composition "Princesa."`,
    s3p2: `Chivín wrote the piece as a musical gift for her niece, Sylvia Teresa Pérez Riley, Sharon's daughter. An instrumental version of "Princesa" appears beneath several of the album's radio segments, allowing another branch of the family's musical legacy to become part of the album's storytelling.`,
    s3p3: "Jaime Albizu Lamboy Riley, Chivín's son and Sylvia Rexach's grandson, appears as a featured guest artist on three songs. Maritzaida and Weibe traveled to Nyon, Switzerland, to complete the recording with him. Jaime's daughter, Alina Isabel Lamboy Díaz, Sylvia Rexach's great-granddaughter, contributes as a guest locutora, bringing a fourth generation of the family into the project. A grant from the Arts Council of Greater Greensboro in Greensboro, NC, helped make travel for this project possible.",
    s3p4: "The journey was also enriched by the steadfast encouragement, friendship and joyful spirit of Sylvia Teresa Pérez Riley, whose support accompanied the project from beginning to end.",

    s4heading: "Honoring Tutti Umpierre",
    s4p1: "Beyond preserving Sylvia Rexach's remarkable catalog, the project seeks to elevate the legacy of Tutti Umpierre.",
    s4p2: "While Rexach's songwriting has long been celebrated, Umpierre's artistry as a guitarist, arranger, composer and collaborator was indispensable to the sound of Puerto Rican Música Bohemia. His harmonies, accompaniment and musical sensitivity helped define the way many of Rexach's compositions were first heard and understood.",
    s4p3: "Through Radio Bohemia Volumen II, Maritzaida and Weibe hope to inspire greater recognition of Umpierre as one of the essential musical voices behind the tradition.",
    q3: `"There is something deeply personal about spending years studying someone you never had the chance to meet," said Weibe. "When recordings existed, I tried to follow his guitar parts as closely as possible. When they did not, I wrote parts that drew from his distinctive musical language. Inevitably, there came a point when I had to bring my own voice to that tradition and make choices that were inspired by Tutti, even if they could never be exactly what he would have played. I hope this project encourages listeners not only to rediscover Sylvia Rexach's extraordinary songwriting, but also to recognize Tutti Umpierre as one of the great musical voices behind that legacy."`,

    s5heading: "A Different Response to Puerto Rico's Musical Renaissance",
    s5p1: "The release comes at a time of renewed global interest in Puerto Rico's musical heritage.",
    s5p2: "Contemporary artists such as Bad Bunny have introduced millions of listeners to traditional Puerto Rican sounds, rhythms, recordings and cultural references by weaving them into modern music. That work has encouraged new audiences to explore the island's extraordinary musical traditions and the artists who shaped them.",
    s5p3: "Maritzaida and Weibe see Radio Bohemia Volumen II as a complementary effort, undertaken on a different scale and with a different artistic purpose.",
    s5p4: "Rather than reimagining the songs through a contemporary lens, their goal was to recreate the sound, performance style and atmosphere of Puerto Rican Música Bohemia as faithfully as possible.",
    s5p5: "Recorded live in stereo and developed hand-in-hand with Rexach's family, the album seeks to preserve not only the songs themselves, but the experience of hearing them performed in the intimate style from which they originated.",

    s6heading: "Poetry, Radio and Collaboration",
    s6p1_before: "Actor Robi Arce Martínez returns as the album's principal locutor, continuing the radio format established on ",
    s6p1_rbv1: "Radio Bohemia Volumen I",
    s6p1_after: ". His narration connects the music, poetry and family voices into a continuous program modeled after the broadcasts that inspired the project. The album also features an original spoken-word contribution from Miguel Font Carballo, a friend of the Rexach family.",
    s6p2: "Maritzaida and Weibe also express their gratitude to legendary guitarist Charlie Hunter and Tahi Hunter of SideHustle Records for their encouragement, friendship and belief in the project from its earliest stages. SideHustle Records provided distribution and industry support.",
    s6p3_rbv2: "Radio Bohemia Volumen II",
    s6p3_after: " is the culmination of years of friendship, historical research, artistic collaboration and a shared commitment to ensuring that Puerto Rican Música Bohemia continues to reach and inspire future generations.",
    s6p4: "The album will be released October 20, 2026.",

    s7heading: "About Maritzaida and AJ Weibe",
    s7p1: "Maritzaida and AJ Weibe are a husband-and-wife musical duo dedicated to preserving and celebrating Puerto Rico's musical heritage through historically informed performance.",
    s7p2: "Working in close collaboration with Sylvia Rexach's family, their recordings present the music of Rexach and Tutti Umpierre with a commitment to historical authenticity while introducing the work to new audiences around the world.",
    s7p3: "Before beginning this preservation project, both spent nearly a decade as professional musicians with the United States Air Force Band, performing throughout the United States, Europe and Asia while stationed in Virginia and Tokyo.",
    s7p4: "Today, Dr. Maritzaida Amador and Dr. AJ Weibe continue to lead dual careers as musicians and professionals while researching, preserving, recording and sharing Puerto Rico's musical legacy.",
    s7p5: "Radio Bohemia Volumen II will be distributed by SideHustle Records.",

    contactHeading: "Contact",
    contactEmail: "amador.weibe@gmail.com",
    contactWebsite: "www.maritzaida.com",
  },

  es: {
    forImmediateRelease: "Para Publicación Inmediata",
    headline: "Una Familia. Cuatro Generaciones. Una Misión Para Preservar la Música Bohemia Puertorriqueña.",
    subheadline: "Publicado en el 65° aniversario de la muerte de Sylvia Rexach, Radio Bohemia Volumen II reúne a su familia y a los músicos Maritzaida y AJ Weibe en un ambicioso esfuerzo por preservar el sonido auténtico de la Música Bohemia Puertorriqueña.",
    presave: "Pre-guardar el Álbum",
    preorder: "Pre-ordenar el CD",
    releaseDate: "20 de octubre de 2026",
    releaseDateLabel: "Fecha de lanzamiento",
    label: "SideHustle Records",
    labelLabel: "Sello",
    continueToSite: "Continuar a maritzaida.com",

    p1: "GREENSBORO, N.C. — El 20 de octubre de 2026, en el 65° aniversario de la muerte de Sylvia Rexach, los artistas Maritzaida y AJ Weibe lanzarán Radio Bohemia Volumen II a través de SideHustle Records, la culminación de una colaboración de varios años con la familia de Rexach para preservar una de las tradiciones musicales más valiosas de Puerto Rico.",
    p2: "Más que un álbum, Radio Bohemia Volumen II es un proyecto de preservación histórica. Desarrollado en estrecha colaboración con la familia Rexach, reúne investigación de archivos, orientación familiar, interpretación históricamente informada y técnicas de grabación analógica para recrear el sonido íntimo, el espíritu artístico y la narrativa de la Música Bohemia Puertorriqueña tal como la habrían vivido las audiencias durante las décadas de 1950 y 1960.",
    p3: "La Música Bohemia Puertorriqueña es una tradición musical singular caracterizada por voces íntimas, composiciones poéticas y una sofisticada acompañamiento de guitarra. Surgida de los programas de radio, los clubes y las reuniones nocturnas de mediados del siglo XX en Puerto Rico, el estilo reunió elementos del bolero, la canción y el filin mientras desarrollaba su propio lenguaje reconocible de interpretación, armonía y narrativa. Rexach y Umpierre estuvieron entre los artistas que dieron a esa tradición su voz definitoria.",
    p4: "Publicado en el aniversario de la muerte de Rexach, el álbum representa tanto un homenaje a una de las compositoras más importantes de Puerto Rico como una celebración de la extraordinaria asociación artística que compartió con el guitarrista, arreglista, compositor y colaborador Tutti Umpierre.",
    p5_before: "A través de cinco lanzamientos",
    p5_link: "https://www.maritzaida.com/music",
    p5_after: "—Alma Adentro en 2024, Sentimientos En Vivo, El Otro Camino y Radio Bohemia Volumen I en 2025, y Radio Bohemia Volumen II en 2026—Maritzaida y AJ Weibe han grabado 45 composiciones de Rexach y Umpierre. Se cree que esta colección es el mayor conjunto de su música grabado por un solo artista.",

    s1heading: "Recreando los Programas de Radio de 1953",
    s1p1: "Con 21 canciones presentadas en 27 pistas, Radio Bohemia Volumen II recrea la atmósfera de los programas de radio originales de 1953 con Rexach y Umpierre.",
    s1p2: "Las interpretaciones musicales en vivo se entrelazan con narración y segmentos de radio inspirados en la época, creando la sensación de sintonizar una transmisión íntima de madrugada en la que música, poesía y conversación se despliegan juntas.",
    s1p3: "Cada interpretación musical fue grabada en vivo alrededor de un solo micrófono de cinta estéreo. En lugar de construir las canciones instrumento por instrumento mediante la producción moderna de estudio, Maritzaida y Weibe actuaron uno frente al otro en la misma habitación, abrazando la calidez, la espontaneidad y el equilibrio natural que definió la Música Bohemia Puertorriqueña.",
    s1p4: "El proyecto fue diseñado para preservar no solo las composiciones, sino también el lenguaje musical, las tradiciones de interpretación y la atmósfera cultural de la que surgieron.",

    s2heading: "Una Colaboración Con la Familia de Sylvia Rexach",
    s2p1_before: "El camino comenzó tras el lanzamiento de ",
    s2p1_alma: "Alma Adentro",
    s2p1_after: " en 2024, cuando Maritzaida y AJ Weibe fueron presentados a Sharon Riley Rexach, hija de Sylvia Rexach. ",
    s2p1_alma2: "Alma Adentro",
    s2p1_end: " fue una recreación del icónico álbum de 1958 de Sylvia Rexach y Tutti Umpierre, Sylvia Canta a Sylvia Rexach.",
    s2p2: "Lo que comenzó como una conversación se convirtió rápidamente en una amistad y un compromiso compartido de preservar la música de Rexach y Umpierre.",
    s2p3_before: "Esa colaboración se profundizó en los años siguientes. Sharon apareció como artista invitada en ",
    s2p3_rbv1: "Radio Bohemia Volumen I",
    s2p3_middle: ", interpretando ",
    s2p3_dios: "Dios de Oro",
    s2p3_after: " aproximadamente 50 años después de haberlo grabado con Umpierre en su propio álbum debut.",
    s2p4_before: "AJ Weibe restauró y remasterizó posteriormente las históricas grabaciones de Sharon con Umpierre desde vinilo, ",
    s2p4_sharon: "Sylvia Rexach En La Voz de Sharon Riley",
    s2p4_sharon_link: "/sharon-riley-rexach",
    s2p4_after: ", preparando el álbum para su primer lanzamiento digital y preservando otro capítulo importante de la historia musical puertorriqueña.",
    s2p5_before: "Para ",
    s2p5_rbv2: "Radio Bohemia Volumen II",
    s2p5_after: ", Sharon volvió a desempeñarse como asesora musical principal del proyecto, trabajando estrechamente con Maritzaida y Weibe en cada composición. Juntos examinaron cada canción con un nivel de detalle extraordinario, discutiendo la interpretación vocal, la pronunciación, el fraseo, el tempo, la armonía, el carácter emocional y las intenciones artísticas detrás de las interpretaciones originales.",
    s2p6: "Existen pocas grabaciones históricas de gran parte del repertorio, y muchas de las composiciones nunca han sido ampliamente revisitadas por artistas contemporáneos. En lugar de basarse exclusivamente en las grabaciones existentes, Maritzaida y Weibe buscaron aprender de la tradición viva preservada dentro de la familia Rexach.",
    q1: "«Nunca imaginé, hace solo unos años, que mi vida llegaría a estar tan entrelazada con la música de Sylvia Rexach y Tutti Umpierre», dijo Maritzaida. «Este se ha convertido en el viaje artístico más significativo de mi vida. Como puertorriqueña, ha sido un privilegio increíble ayudar a preservar una parte de nuestro patrimonio musical, y estoy profundamente agradecida a Sharon y a su familia por habernos acogido en ese trabajo. Igualmente agradecida de haber compartido este camino con mi esposo, AJ. Juntos hemos intentado honrarlo con el respeto, el amor y el cuidado que merece.»",
    s2p7: "Maritzaida da vida al repertorio a través de sus interpretaciones vocales. Weibe actuó como productor, arreglista, guitarrista, ingeniero de grabación e ingeniero de masterización.",
    s2p8: "Cada arreglo evolucionó a través de años de estudio, informado por conversaciones con Sharon y un análisis minucioso de las grabaciones sobrevivientes de Rexach y Umpierre.",
    q2: "«Una cosa es interpretar estas canciones», dijo Weibe. «Otra cosa es entender cómo debían ser comunicadas. Sharon nos ayudó a comprender cómo Sylvia moldeaba una frase, cómo comunicaba la emoción y cómo la guitarra de Tutti se convertía en parte de esa conversación. Cada arreglo de este álbum surgió de esas discusiones.»",

    sharonQuote: `Este gran proyecto tiene un inmenso significado para mí. Un trabajo donde el amor por la música unió familias, amigos y afectos con tanto sentimiento. Es como la amistad musical y de vida de mi madre, Sylvia Rexach con Tutti Umpierre, una de las más importantes de la bohemia puertorriqueña, la inspiración de toda una generación de boleristas. Sylvia y Tutti eran bohemia pura: dos amigos, un par de tragos, un estudio y una guitarra bastaron para saciar la necesidad de inmortalizar sus canciones. <em style="font-style:normal">Sylvia Rexach canta a Sylvia Rexach</em>, grabado en los estudios de Antonio Ochoa, en el año 1958. Quizás, fue instinto de conservación musical o el principio del desenlace que conocemos, pero que seguimos cuidando para que su luz no se apague, para que su música siga trascendiendo, desafiando lo fugaz de la vida y siga conectando con nuestras emociones a través de generaciones.`,
    sharonQuoteEn: null,
    sharonAttrib: "Sharon Riley Rexach",
    sharonAttribSub: "Hija de Sylvia Rexach",

    s3heading: "Cuatro Generaciones de la Familia Rexach",
    s3p1_before: `Radio Bohemia Volumen II reúne a cuatro generaciones vinculadas a través de la familia de Sylvia Rexach. Sharon Riley Rexach actuó como asesora musical principal del álbum, mientras que su hermana, Sylvia Eileen "Chivín" Riley, está representada a través de su composición "Princesa."`,
    s3p2: `Chivín escribió la pieza como regalo musical para su sobrina, Sylvia Teresa Pérez Riley, hija de Sharon. Una versión instrumental de "Princesa" aparece bajo varios de los segmentos de radio del álbum, permitiendo que otra rama del legado musical de la familia forme parte de la narrativa del disco.`,
    s3p3: "Jaime Albizu Lamboy Riley, hijo de Chivín y nieto de Sylvia Rexach, aparece como artista invitado en tres canciones. Maritzaida y Weibe viajaron a Nyon, Suiza, para completar la grabación con él. La hija de Jaime, Alina Isabel Lamboy Díaz, bisnieta de Sylvia Rexach, contribuye como locutora invitada, incorporando una cuarta generación de la familia al proyecto. Una beca del Arts Council of Greater Greensboro en Greensboro, NC, ayudó a hacer posible el viaje para este proyecto.",
    s3p4: "El camino también se vio enriquecido por el firme aliento, la amistad y el espíritu alegre de Sylvia Teresa Pérez Riley, cuyo apoyo acompañó el proyecto de principio a fin.",

    s4heading: "Honrando a Tutti Umpierre",
    s4p1: "Más allá de preservar el extraordinario catálogo de Sylvia Rexach, el proyecto busca elevar el legado de Tutti Umpierre.",
    s4p2: "Si bien la obra compositiva de Rexach ha sido celebrada durante mucho tiempo, la maestría de Umpierre como guitarrista, arreglista, compositor y colaborador fue indispensable para el sonido de la Música Bohemia Puertorriqueña. Sus armonías, acompañamiento y sensibilidad musical ayudaron a definir la manera en que muchas de las composiciones de Rexach fueron escuchadas y comprendidas por primera vez.",
    s4p3: "A través de Radio Bohemia Volumen II, Maritzaida y Weibe esperan inspirar un mayor reconocimiento de Umpierre como una de las voces musicales esenciales detrás de la tradición.",
    q3: "«Hay algo profundamente personal en pasar años estudiando a alguien a quien nunca tuviste la oportunidad de conocer», dijo Weibe. «Cuando existían grabaciones, intenté seguir sus partes de guitarra lo más fielmente posible. Cuando no existían, escribí partes que se inspiraban en su lenguaje musical distintivo. Inevitablemente, llegó un momento en que tuve que aportar mi propia voz a esa tradición y tomar decisiones inspiradas en Tutti, aunque nunca pudieran ser exactamente lo que él habría tocado. Espero que este proyecto anime a los oyentes no solo a redescubrir la extraordinaria obra compositiva de Sylvia Rexach, sino también a reconocer a Tutti Umpierre como una de las grandes voces musicales detrás de ese legado.»",

    s5heading: "Una Respuesta Diferente al Renacimiento Musical de Puerto Rico",
    s5p1: "El lanzamiento llega en un momento de renovado interés mundial en el patrimonio musical de Puerto Rico.",
    s5p2: "Artistas contemporáneos como Bad Bunny han introducido a millones de oyentes a los sonidos tradicionales, ritmos, grabaciones y referencias culturales puertorriqueños al entrelazarlos con la música moderna. Ese trabajo ha animado a nuevas audiencias a explorar las extraordinarias tradiciones musicales de la isla y a los artistas que las forjaron.",
    s5p3: "Maritzaida y Weibe ven Radio Bohemia Volumen II como un esfuerzo complementario, realizado a una escala diferente y con un propósito artístico distinto.",
    s5p4: "En lugar de reimaginar las canciones a través de un prisma contemporáneo, su objetivo fue recrear el sonido, el estilo de interpretación y la atmósfera de la Música Bohemia Puertorriqueña de la manera más fiel posible.",
    s5p5: "Grabado en vivo en estéreo y desarrollado de la mano de la familia Rexach, el álbum busca preservar no solo las canciones en sí, sino la experiencia de escucharlas interpretadas en el estilo íntimo del que surgieron.",

    s6heading: "Poesía, Radio y Colaboración",
    s6p1_before: "El actor Robi Arce Martínez regresa como locutor principal del álbum, continuando el formato de radio establecido en ",
    s6p1_rbv1: "Radio Bohemia Volumen I",
    s6p1_after: ". Su narración conecta la música, la poesía y las voces familiares en un programa continuo modelado a partir de las emisiones que inspiraron el proyecto. El álbum también incluye una contribución original de palabra hablada de Miguel Font Carballo, amigo de la familia Rexach.",
    s6p2: "Maritzaida y Weibe también expresan su gratitud al legendario guitarrista Charlie Hunter y a Tahi Hunter de SideHustle Records por su aliento, amistad y confianza en el proyecto desde sus primeras etapas. SideHustle Records aportó distribución y apoyo en la industria.",
    s6p3_rbv2: "Radio Bohemia Volumen II",
    s6p3_after: " es la culminación de años de amistad, investigación histórica, colaboración artística y un compromiso compartido de garantizar que la Música Bohemia Puertorriqueña continúe llegando e inspirando a las generaciones futuras.",
    s6p4: "El álbum se lanzará el 20 de octubre de 2026.",

    s7heading: "Acerca de Maritzaida y AJ Weibe",
    s7p1: "Maritzaida y AJ Weibe son un dúo musical de esposos dedicado a preservar y celebrar el patrimonio musical de Puerto Rico a través de la interpretación históricamente informada.",
    s7p2: "Trabajando en estrecha colaboración con la familia de Sylvia Rexach, sus grabaciones presentan la música de Rexach y Tutti Umpierre con un compromiso de autenticidad histórica, al tiempo que introducen la obra a nuevas audiencias en todo el mundo.",
    s7p3: "Antes de comenzar este proyecto de preservación, ambos pasaron casi una década como músicos profesionales en la Banda de la Fuerza Aérea de los Estados Unidos, actuando en los Estados Unidos, Europa y Asia mientras estaban destinados en Virginia y Tokio.",
    s7p4: "Hoy, la Dra. Maritzaida Amador y el Dr. AJ Weibe continúan desarrollando carreras paralelas como músicos y profesionales mientras investigan, preservan, graban y comparten el legado musical de Puerto Rico.",
    s7p5: "Radio Bohemia Volumen II será distribuido por SideHustle Records.",

    contactHeading: "Contacto",
    contactEmail: "amador.weibe@gmail.com",
    contactWebsite: "www.maritzaida.com",
  },
};

function PressPhoto({
  src,
  alt,
  caption,
  aspect = "aspect-[3/2]",
  objectPosition = "object-center",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  objectPosition?: string;
}) {
  return (
    <figure className="my-12 -mx-6 md:mx-0">
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <Image src={src} alt={alt} fill className={`object-cover ${objectPosition}`} sizes="(max-width: 768px) 100vw, 800px" />
      </div>
      {caption && (
        <figcaption className="mt-3 px-6 md:px-0 text-xs tracking-wide" style={{ color: "var(--text-dim)", fontFamily: "var(--font-inter)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function T({ t }: { t: string }) {
  const parts = t.split(/(Radio Bohemia Volumen II|Radio Bohemia Volumen I)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Radio Bohemia Volumen II" || part === "Radio Bohemia Volumen I" ? (
          <em key={i}>{part}</em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function PressReleaseRBVIIContent() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <main style={{ background: "var(--bg)", color: "var(--text-primary)" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/press/performing-arm.jpg"
            alt="Maritzaida performing live"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(13,11,9,0.45) 0%, rgba(13,11,9,0.75) 50%, rgba(13,11,9,1) 100%)" }}
          />
        </div>

        {/* Album cover inset */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 hidden sm:block">
          <div className="relative w-28 h-28 md:w-40 md:h-40 shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image src="/albums/radio-bohemia-vol-2.png" alt="Radio Bohemia Volumen II album cover" fill className="object-cover" sizes="160px" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {c.forImmediateRelease}
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            {c.headline}
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mb-10" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            <T t={c.subheadline} />
          </p>

          <div className="flex flex-wrap gap-8 mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}>{c.releaseDateLabel}</p>
              <p className="text-sm" style={{ color: "var(--gold)" }}>{c.releaseDate}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}>{c.labelLabel}</p>
              <p className="text-sm" style={{ color: "var(--gold)" }}>{c.label}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="https://orcd.co/radiobohemiav2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
              style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {c.presave}
            </a>
            <Link
              href="/store"
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
              style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {c.preorder}
            </Link>
          </div>

          <Link
            href="/"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: "var(--text-dim)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
          >
            ← {c.continueToSite}
          </Link>
        </div>
      </section>

      {/* ── PRESS RELEASE BODY ── */}
      <article className="max-w-3xl mx-auto px-6 py-20 space-y-8">

        {/* Opening paragraphs */}
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.p1} /></p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.p2} /></p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.p3}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.p4}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          <a href={c.p5_link} className="hover-gold underline" style={{ color: "var(--gold)" }}>{c.p5_before}</a>
          <T t={c.p5_after} />
        </p>

        {/* Duo portrait */}
        <PressPhoto
          src="/press/duo-portrait.jpg"
          alt="Maritzaida and AJ Weibe – promotional portrait"
          caption={lang === "en" ? "Maritzaida and AJ Weibe. Photo by Steel String Photo." : "Maritzaida y AJ Weibe. Foto: Steel String Photo."}
          aspect="aspect-[3/4]"
          objectPosition="object-center"
        />

        {/* Section 1 */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s1heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.s1p1} /></p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s1p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s1p3}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s1p4}</p>

        {/* Ribbon mic session photo */}
        <PressPhoto
          src="/press/ribbon-mic.jpg"
          alt="Maritzaida and Sharon Riley Rexach during recording sessions for Radio Bohemia Volumen I"
          caption={lang === "en" ? "Recording session with Sharon Riley Rexach for Radio Bohemia Volumen I. Photo by Alexei Moujev." : "Sesión de grabación con Sharon Riley Rexach para Radio Bohemia Volumen I. Foto: Alexei Moujev."}
        />

        {/* Section 2 */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s2heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          {c.s2p1_before}<em>{c.s2p1_alma}</em>{c.s2p1_after}<em>{c.s2p1_alma2}</em>{c.s2p1_end}
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s2p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          {c.s2p3_before}<em>{c.s2p3_rbv1}</em>{c.s2p3_middle}
          <a href="https://youtu.be/zVF0G8Vl7bI?si=UvLSi5re1nUJ_4W-" target="_blank" rel="noopener noreferrer" className="hover-gold underline" style={{ color: "var(--gold)" }}>{c.s2p3_dios}</a>
          {c.s2p3_after}
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          {c.s2p4_before}
          <Link href="/sharon-riley-rexach" className="hover-gold underline" style={{ color: "var(--gold)" }}>{c.s2p4_sharon}</Link>
          {c.s2p4_after}
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          {c.s2p5_before}<em>{c.s2p5_rbv2}</em>{c.s2p5_after}
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s2p6}</p>

        {/* Quote 1 — Maritzaida */}
        <blockquote className="p-6 border-l-2 my-8" style={{ borderColor: "var(--gold)", background: "var(--bg-elevated)" }}>
          <p className="text-base leading-relaxed italic" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cormorant)", fontSize: "1.15rem" }}>
            {c.q1}
          </p>
        </blockquote>

        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s2p7}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s2p8}</p>

        {/* Quote 2 — Weibe */}
        <blockquote className="p-6 border-l-2 my-8" style={{ borderColor: "var(--gold)", background: "var(--bg-elevated)" }}>
          <p className="text-base leading-relaxed italic" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cormorant)", fontSize: "1.15rem" }}>
            {c.q2}
          </p>
        </blockquote>

      </article>

      {/* ── SHARON RILEY REXACH CALLOUT ── */}
      <section
        className="relative overflow-hidden py-0"
        style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        aria-label="Sharon Riley Rexach quote"
      >
        <div className="max-w-5xl mx-auto px-6 py-0 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">

          {/* Sharon photo */}
          <div className="relative h-56 md:h-full overflow-hidden" style={{ minHeight: 180 }}>
            <Image
              src="/press/sharon-portrait.png"
              alt="Sharon Riley Rexach, daughter of Sylvia Rexach"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>

          {/* Quote */}
          <div className="flex flex-col justify-center px-0 md:px-12 py-16">
            <p
              className="text-5xl md:text-6xl mb-4 leading-none"
              style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)", opacity: 0.6 }}
              aria-hidden="true"
            >
              &ldquo;
            </p>
            <blockquote>
              <p
                className="text-lg md:text-xl leading-relaxed italic mb-2"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
                dangerouslySetInnerHTML={{ __html: c.sharonQuote }}
              />
              <footer className="mt-6">
                <p className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)", letterSpacing: "0.15em" }}>
                  — {c.sharonAttrib}
                </p>
                <p className="text-xs tracking-wide mt-1" style={{ color: "var(--text-dim)", fontFamily: "var(--font-inter)" }}>
                  {c.sharonAttribSub}
                </p>
              </footer>
            </blockquote>
          </div>

        </div>
      </section>

      {/* ── CONTINUED BODY ── */}
      <article className="max-w-3xl mx-auto px-6 py-20 space-y-8">

        {/* Section 3 */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s3heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.s3p1_before} /></p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s3p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s3p3}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s3p4}</p>

        {/* Jaime recording trip photo */}
        <PressPhoto
          src="/press/switzerland.jpg"
          alt="Jaime Albizu Lamboy Riley, AJ Weibe, Maritzaida, and Jaime's wife in Switzerland"
          caption={lang === "en" ? "Jaime Albizu Lamboy Riley with Maritzaida and AJ Weibe in Nyon, Switzerland." : "Jaime Albizu Lamboy Riley con Maritzaida y AJ Weibe en Nyon, Suiza."}
          aspect="aspect-[4/3]"
        />

        {/* Section 4 */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s4heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s4p1}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s4p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.s4p3} /></p>

        {/* Quote 3 — Weibe on Tutti */}
        <blockquote className="p-6 border-l-2 my-8" style={{ borderColor: "var(--gold)", background: "var(--bg-elevated)" }}>
          <p className="text-base leading-relaxed italic" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cormorant)", fontSize: "1.15rem" }}>
            {c.q3}
          </p>
        </blockquote>


        {/* Section 5 */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s5heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s5p1}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s5p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.s5p3} /></p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s5p4}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s5p5}</p>

        {/* Section 6 */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s6heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          {c.s6p1_before}<em>{c.s6p1_rbv1}</em>{c.s6p1_after}
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s6p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
          <em>{c.s6p3_rbv2}</em>{c.s6p3_after}
        </p>
        <p className="text-base leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>{c.s6p4}</p>


        {/* Pre-save / Pre-order CTA */}
        <div id="presave" className="py-12 border-t border-b" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {lang === "en" ? "Listen & Pre-Order" : "Escuchar y Pre-ordenar"}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://orcd.co/radiobohemiav2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
              style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {c.presave}
            </a>
            <Link
              href="/store"
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
              style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {c.preorder}
            </Link>
          </div>
        </div>

        {/* Section 7 — About */}
        <h2 className="text-3xl pt-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.s7heading}</h2>
        <span className="divider-gold" />
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s7p1}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s7p2}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s7p3}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{c.s7p4}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}><T t={c.s7p5} /></p>

        {/* Contact */}
        <div className="pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-2xl mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>{c.contactHeading}</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Email: <a href={`mailto:${c.contactEmail}`} className="hover-gold" style={{ color: "var(--gold)" }}>{c.contactEmail}</a>
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {lang === "en" ? "Website" : "Sitio web"}: <Link href="/" className="hover-gold" style={{ color: "var(--gold)" }}>{c.contactWebsite}</Link>
          </p>
        </div>

        <div className="pt-8 text-center">
          <Link
            href="/"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: "var(--text-dim)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
          >
            ← {c.continueToSite}
          </Link>
        </div>

      </article>

    </main>
  );
}
