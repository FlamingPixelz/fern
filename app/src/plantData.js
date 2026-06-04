import basil from "./images/basil.webp"
import pothos from "./images/pothos.webp"
import succulent from "./images/succulent.png"
import snakeplant from "./images/snakeplant.png"
import peacelily from "./images/peacelily.webp"
import monstera from "./images/monstera.webp"

export const speciesInfo = {
  Basil: {
    waterInterval: 1,
    image: basil
  },
  Pothos: {
    waterInterval: 8,
    image: pothos
  },
  Succulent: {
    waterInterval: 14,
    image: succulent
  },
  "Snake Plant": {
    waterInterval: 7,
    image: snakeplant
  },
  "Peace Lily": {
    waterInterval: 8,
    image: peacelily
  },
  Monstera: {
    waterInterval: 10,
    image: monstera
  }
}

function createSamplePlants(count = 10) {
  const firstNames = [
    "Fern",
    "Rose",
    "Ivy",
    "Lily",
    "Sage",
    "Willow",
    "Basil",
    "Clover",
    "Juniper",
    "Maple",
    "Olive",
    "Hazel",
    "Jasmine",
    "Lavender",
    "Poppy",
    "Violet",
    "Daisy",
    "Aster",
    "Cedar",
    "Aspen"
  ];

  const lastNames = [
    "Bloom",
    "Leaf",
    "Root",
    "Petal",
    "Thorn",
    "Branch",
    "Stem",
    "Sprout",
    "Vine",
    "Moss",
    "Bark",
    "Blossom",
    "Reed",
    "Fernwood",
    "Greenfield",
    "Oakley",
    "Meadow",
    "Wildroot",
    "Evergreen",
    "Hawthorn"
  ];

  const plantLocations = [
    "Living Room",
    "Kitchen Counter",
    "Bedroom Windowsill",
    "Bathroom Shelf",
    "Dining Table",
    "Home Office Desk",
    "Front Porch",
    "Back Patio",
    "Balcony",
    "Garden Bed",
    "Greenhouse",
    "Hallway Table",
    "Bookshelf",
    "Laundry Room",
    "Garage Corner",
    "Entryway",
    "Sunroom",
    "Fence Line",
    "Poolside",
    "Outdoor Deck"
  ];
  const pick = (a) => a[Math.floor(Math.random() * a.length)]
  const plants = new Array(count).fill({})
  const speciesNames = Object.keys(speciesInfo)
  for (let i = 0; i < count; i++) {
    plants[i] = {
      id: i,
      name: pick(firstNames) + " " + pick(lastNames),
      species: pick(speciesNames),
      nextWaterDays: Math.floor(Math.random() * 8) - 1,
      location: pick(plantLocations),
      health: pick(["happy", "sad", "neutral"])
    }
  }
  return plants
}

export const plantInfo = createSamplePlants(8)
