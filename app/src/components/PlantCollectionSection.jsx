import './PlantListItem.css';
import PlantListItem from './PlantListItem';
 

export default function MyPlantsSection({ plants = [], onAddPlant = () => {}, onContextMenu = () => {} }) {
  return (
    <section>
      <div className = "heading-bar">
        <h2>
          <span>🍃</span>
          My Plants
        </h2>
 
        <button className = "add-plant-button" onClick={onAddPlant}>
          + Add new plant
        </button>
      </div>
 
      <div className="plant-scroll-wrapper">
        <ul className = "plant-list">
          {plants.map((plant) => (
            <PlantListItem
              key={plant.id}
              name={plant.name}
              species={plant.species}
              location={plant.location}
              nextWaterDays={plant.nextWaterDays}
              image={plant.image}
              health={plant.health}
              onContextMenu={() => onContextMenu(plant.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
