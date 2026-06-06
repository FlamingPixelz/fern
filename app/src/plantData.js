import basil from "./images/basil.png"
import pothos from "./images/pothos.png"
import succulent from "./images/succulent.png"
import snakeplant from "./images/snakeplant.png"
import peacelily from "./images/peacelily.png"
import monstera from "./images/monstera.png"
import fiddleLeafFig from "./images/fiddleleaffig.png"
import lavender from "./images/lavender.png"
import aloeVera from "./images/aloe.png"
import spiderPlant from "./images/spiderplant.png"

export const speciesInfo = {
  Basil: {
    waterInterval: 2,
    recommendedFrequency: "2-3 days",
    image: basil
  },
  Pothos: {
    waterInterval: 7,
    recommendedFrequency: "7-14 days",
    image: pothos
  },
  Succulent: {
    waterInterval: 21,
    recommendedFrequency: "21-30 days",
    image: succulent
  },
  "Snake Plant": {
    waterInterval: 18,
    recommendedFrequency: "14-21 days",
    image: snakeplant
  },
  "Peace Lily": {
    waterInterval: 6,
    recommendedFrequency: "5-7 days",
    image: peacelily
  },
  Monstera: {
    waterInterval: 8,
    recommendedFrequency: "7-10 days",
    image: monstera
  },
  "Fiddle-leaf Fig": {
    waterInterval: 8,
    recommendedFrequency: "7-10 days",
    image: fiddleLeafFig
  },
  Lavender: {
    waterInterval: 10,
    recommendedFrequency: "10-14 days",
    image: lavender
  },
  "Aloe Vera": {
    waterInterval: 24,
    recommendedFrequency: "21-28 days",
    image: aloeVera
  },
  "Spider Plant": {
    waterInterval: 8,
    recommendedFrequency: "7-10 days",
    image: spiderPlant
  }
};

export const firstNames = [
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

export const lastNames = [
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

export const plantLocations = [
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

function createSamplePlants(count = 10) {

  const pick = (a) => a[Math.floor(Math.random() * a.length)]
  const plants = new Array(count).fill({})
  const speciesNames = Object.keys(speciesInfo)

  for (let i = 0; i < count; i++) {
    const nextWater = Math.floor(Math.random() * 8) - 1
    const species = pick(speciesNames)
    plants[i] = {
      id: i,
      name: pick(firstNames) + " " + pick(lastNames),
      species: species,
      nextWaterDays: nextWater,
      interval: speciesInfo[species].waterInterval,
      location: pick(plantLocations),
      health: pick([nextWater < 0 ? "sad" : "happy", "sad", "neutral"])
    }
  }
  return plants
}

export const plantInfo = createSamplePlants(8)
