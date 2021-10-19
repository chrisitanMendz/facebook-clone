const randomImage = (e) => {
  const rand = Math.random();
  return `url(https://source.unsplash.com/random/900x1600/?face,${rand}`;
};

export const lists = [
  {
    name: "Random",
    url: randomImage(),
  },
  {
    name: "Random",
    url: randomImage(),
  },
  {
    name: "Random",
    url: randomImage(),
  },
  {
    name: "Random",
    url: randomImage(),
  },
];
