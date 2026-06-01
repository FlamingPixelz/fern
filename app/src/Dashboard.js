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
  const allPlants = [...plantInfo].sort((a, b) => a.nextWaterDays - b.nextWaterDays);
 
  const handleWatered = (plantId) => {
    // mark plant as watered, update nextWaterDays
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
