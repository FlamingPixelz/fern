import React from 'react';
import './Dashboard.css';
import MyPlantsSection from './components/PlantCollectionSection';
import WaterTodaySection from './components/WaterTodaySection';
import WelcomeMessage from './components/WelcomeMessage';
import { plantInfo, speciesInfo } from './plantData';

export default function Dashboard() {

  const [allPlants, updateAllPlants] = React.useState(plantInfo.toSorted((a, b) => a.nextWaterDays - b.nextWaterDays))
  const [waterToday, updateWaterToday] = React.useState(allPlants.filter(p => p.nextWaterDays <= 0))

  const handleWatered = (plantId) => {
    const copy = [...allPlants]
    const index = copy.findIndex(p => p.id === plantId)
    if (index === -1) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    const plant = copy.splice(index, 1)[0]
    plant.nextWaterDays = plant.interval
    copy.push(plant);
    updateAllPlants(copy);
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0))
  };

  const handleEdit = (plantId, props) => {
    const copy = [...allPlants]
    const index = copy.findIndex(p => p.id === plantId)
    if (index === -1) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    if (props.name && props.name.length) copy[index].name = props.name
    if (props.species && props.species.length && props.species in Object.keys(speciesInfo)) copy[index].species = props.species
    if (props.location && props.location.length) copy[index].location = props.location

    updateAllPlants(copy)
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

      <MyPlantsSection
        plants={allPlants}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSchedule={handleSchedule}
      />
    </main>
  );
}
