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

export const plantInfo = [
  { id: 1, name: "Basil", species: "Basil", location: "Kitchen Windowsill", nextWaterDays: -2, health: "sad" },
  { id: 2, name: "Perry", species: "Pothos", location: "Kitchen Window", nextWaterDays: 0, health: "neutral" },
  { id: 3, name: "Susan", species: "Succulent", location: "Bedroom Window", nextWaterDays: 0, health: "happy" },
  { id: 4, name: "Snakey", species: "Snake Plant", location: "Hallway", nextWaterDays: 1, health: "happy" },
  { id: 5, name: "Lily", species: "Peace Lily", location: "Bedroom", nextWaterDays: 3, health: "neutral" },
  { id: 6, name: "Monsta", species: "Monstera", location: "Living Room", nextWaterDays: 7, health: "happy" },
];
