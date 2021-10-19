const listOfNames = [
  "Dalton Lebsock",
  "Tim Budd",
  "Sara Fitzsimons",
  "Simona Carbone",
  "Dacia Geraci ",
  "Genevie Mccright",
  "Mallory Hosein",
  "Brock Merry",
  "Jenell Helfer",
  "Jaclyn Griffy",
  "Monet Bugbee",
  "Stephnie Prue ",
  "Tamatha Tadlock",
  "Ara Harbert",
  "Lynnette Tobia",
  "Bernadette Villescas",
  "Tyree Shim",
  "Desire Chism",
  "Georgetta Metzer",
  "Nannie Mo",
  "Kecia Leleux",
  "Walter Hertzog",
  "Manuel Christen",
  "Jeanna Llanes",
  "Sam Durst",
  "Alyce Ricard",
  "Ariel Balliet",
  "Jimmy Frisina",
  "Tiny Merriman",
  "Marin Mccown",
  "Bobby Word",
  "Marcy Prowell",
  "Bret Land ",
  "Florencia Mencer",
  "Nakia Przybylski",
  "Gregorio Harrow ",
  "Houston Richman",
  "Wei Lach",
  "Mona Dentler",
  "Teofila Dangerfield",
  "Esmeralda Sprung ",
  "Ailene Tefft",
  "Donte Evanoff",
  "Crystal Cho",
  "Carmella Ota ",
  "Karine Sperber ",
  "Wilson Stroup",
  "Asha Theurer",
  "Renaldo Sparacino",
  "Shenna Rhynes ",
];

const randomNumber = () => {
  const num = Math.floor(Math.random() * 50);
  return num;
};

const randomImage = () => {
  const rand = Math.random();
  return `url(https://source.unsplash.com/random/900x1600/?funny,${rand}`;
};

export const listOfImage = [
  {
    id: "1",
    name: listOfNames[randomNumber()],
    image: randomImage(),
  },
  {
    id: "2",
    name: listOfNames[randomNumber()],
    image: randomImage(),
  },
  {
    id: "3",
    name: listOfNames[randomNumber()],
    image: randomImage(),
  },
  {
    id: "4",
    name: listOfNames[randomNumber()],
    image: randomImage(),
  },
];
