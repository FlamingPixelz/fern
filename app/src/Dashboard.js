import React from 'react';
import './Dashboard.css';
import MyPlantsSection from './components/PlantCollectionSection';
import WaterTodaySection from './components/WaterTodaySection';
import { plantInfo, speciesInfo } from './plantData';
import WelcomeMessage from './components/WelcomeMessage';

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
    plant.nextWaterDays = speciesInfo[plant.species].waterInterval
    copy.push(plant);
    updateAllPlants(copy);
    updateWaterToday(copy.filter(p => p.nextWaterDays <= 0))
  };

  const handleEdit = (plantId, props) => { }
  const handleDelete = (plantId) => { }
  const handleSchedule = (plantId, days) => { }

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
