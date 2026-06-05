import React from 'react';
import './Dashboard.css';
import EditPropertiesPopup from './components/EditPropertiesPopup';
import MyPlantsSection from './components/PlantCollectionSection';
import WaterTodaySection from './components/WaterTodaySection';
import WelcomeMessage from './components/WelcomeMessage';
import { formatDate, parseLastWateredDate, getDaysSince } from './dateFunctions';
import { firstNames, lastNames, plantInfo, plantLocations, speciesInfo } from './plantData';

export default function Dashboard() {

  const [allPlants, updateAllPlants] = React.useState(plantInfo.toSorted((a, b) => a.nextWaterDays - b.nextWaterDays))
  const [waterToday, updateWaterToday] = React.useState(allPlants.filter(p => p.nextWaterDays <= 0))
  const [addingPlant, setAddingPlant] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const handleWatered = (plantId) => {
    const copy = [...allPlants]
    const index = copy.findIndex(p => p.id === plantId)
    if (index === -1) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    const plant = copy.splice(index, 1)[0]
    plant.nextWaterDays = plant.interval
    plant.lastWatered = formatDate(new Date())
    copy.push(plant);
    updateAllPlants(copy.sort((a, b) => a.nextWaterDays - b.nextWaterDays));
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0))
  };

  const handleEdit = (plantId, props) => {
    console.log("Handle edit:", { props })
    const copy = [...allPlants]
    const index = copy.findIndex(p => p.id === plantId)
    if (index === -1) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    if (props.name && props.name.length) copy[index].name = props.name
    if (props.species && props.species.length && props.species in speciesInfo) copy[index].species = props.species
    if (props.location && props.location.length) copy[index].location = props.location
    if (Number.isInteger(props.wateringFrequency) && props.wateringFrequency > 0) copy[index].interval = props.wateringFrequency
    if (props.lastWatered && props.lastWatered.length) {
      copy[index].lastWatered = props.lastWatered
      const lastWateredDate = parseLastWateredDate(props.lastWatered).date
      if (lastWateredDate) copy[index].nextWaterDays = copy[index].interval - getDaysSince(lastWateredDate)
    }

    updateAllPlants(copy.sort((a, b) => a.nextWaterDays - b.nextWaterDays))
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0));
  }

  const handleDelete = (plantId) => {
    const copy = [...allPlants]
    const index = copy.findIndex(p => p.id === plantId)
    if (index === -1) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    copy.splice(index, 1)
    updateAllPlants(copy)
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0));
  }

  const handleSchedule = (plantId, days) => {
    const copy = [...allPlants]
    const index = copy.findIndex(p => p.id === plantId)
    if (index === -1) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    copy[index].interval = days
    updateAllPlants(copy)
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0))
  }

  const handleAddPlant = (props) => {
    const pick = (a) => a[Math.floor(Math.random() * a.length)]
    const id = Math.max(...allPlants.map(p => p.id)) + 1
    const copy = [...allPlants]
    const species = props.species && props.species.length && props.species in speciesInfo ? props.species : pick(Object.keys(speciesInfo))
    const interval = Number.isInteger(props.wateringFrequency) && props.wateringFrequency > 0 ? props.wateringFrequency : speciesInfo[species].waterInterval
    const lastWateredDate = parseLastWateredDate(props.lastWatered).date
    const nextWaterDays = lastWateredDate ? interval - getDaysSince(lastWateredDate) : interval
    const plant = {
      id,
      name: props.name && props.name.length ? props.name : pick(firstNames) + " " + pick(lastNames),
      location: props.location && props.location.length ? props.location : pick(plantLocations),
      species: species,
      interval,
      nextWaterDays,
      lastWatered: props.lastWatered || "",
      health: "happy"
    }
    copy.push(plant)
    updateAllPlants(copy.sort((a, b) => a.nextWaterDays - b.nextWaterDays));
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0))
    setAddingPlant(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <main className="dashboard">

      <WelcomeMessage
        allPlants={allPlants}
        waterToday={waterToday}
      />

      <WaterTodaySection
        plants={waterToday}
        onWatered={handleWatered}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSchedule={handleSchedule}
      />

      {addingPlant && <EditPropertiesPopup
        onCancel={() => setAddingPlant(false)}
        onOk={handleAddPlant}
      />}

      {showSuccess && (
        <div style={{
          position: "fixed", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          background: "#4e8b4e", color: "#fff", padding: "12px 28px",
          borderRadius: "12px", fontSize: "15px", fontWeight: "500",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)", zIndex: 2000
        }}>
          ✅ Successfully created plant!
        </div>
      )}

      <MyPlantsSection
        plants={allPlants}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSchedule={handleSchedule}
        onAddPlant={() => setAddingPlant(true)}
      />

    </main>
  );
}
