import './PlantListItem';
import WaterListItem from './WaterListItem';


export default function WaterTodaySection({ plants = [], onWatered = () => {}, onContextMenu = () => {} }) {
  if (plants.length === 0) {
    return null; 
  }
 
  return (
    <section>
      <h2>
        <span>💧</span>
        Water today!
      </h2>
 
      <div className="cards-row plant-scroll-wrapper">
        {plants.map((plant) => (
          <WaterListItem
            key={plant.id}
            name={plant.name}
            species={plant.species}
            location={plant.location}
            nextWaterDays={plant.nextWaterDays}
            health={plant.health}
            image={plant.image}
            onWatered={() => onWatered(plant.id)}
            onContextMenu={() => onContextMenu(plant.id)}
          />
        ))}
      </div>
    </section>
  );
}
