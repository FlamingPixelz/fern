import '../Dashboard.css';
import PlantListItem from './PlantListItem';
 

export default function MyPlantsSection({ plants = [], onAddPlant = () => {}, onContextMenu = () => {} }) {
  return (
    <section>
      <div>
        <h2>
          <span></span>
          My Plants
        </h2>
 
        <button onClick={onAddPlant}>
          + Add new plant
        </button>
      </div>
 
      <div>
        <ul>
          {plants.map((plant) => (
            <PlantListItem
              key={plant.id}
              name={plant.name}
              species={plant.species}
              location={plant.location}
              nextWaterDays={plant.nextWaterDays}
              image={plant.image}
              onContextMenu={() => onContextMenu(plant.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
