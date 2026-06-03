import './Dashboard.css';
import WaterTodaySection from './components/WaterTodaySection';
import MyPlantsSection from './components/PlantCollectionSection';
import { plantInfo } from './plantData';

export default function Dashboard() {

  // Plants sorted by due date
  const waterToday = plantInfo
    .filter((plant) => plant.nextWaterDays <= 0)
    .sort((a, b) => a.nextWaterDays - b.nextWaterDays);

  // All plants sorted by urgency 
  const allPlants = plantInfo.toSorted((a, b) => a.nextWaterDays - b.nextWaterDays);

  const handleWatered = (plantId) => {
    const index = plantInfo.find(p => p.id === plantId)
    if (index === undefined) {
      console.error("Error, no plant with id:", plantId, "exists...")
      return
    }
    const plant = plantInfo.splice(index, 1)[0]
    plant.nextWaterDays = 7 // TODO: Add watering frequency to plant info so that this doesn't just increment by a week every time.
    plantInfo.push(plant);
    console.log('Watered plant:', plantId);
  };

  const handleContextMenu = (plantId) => {
    // open context menu for plant
    console.log('Context menu for plant:', plantId);
  };

  return (

    <main>
      <WaterTodaySection
        plants={waterToday}
        onWatered={handleWatered}
        onContextMenu={handleContextMenu}
      />

      <div />

      <MyPlantsSection
        plants={allPlants}
        onContextMenu={handleContextMenu}
      />
    </main>
  );
}
