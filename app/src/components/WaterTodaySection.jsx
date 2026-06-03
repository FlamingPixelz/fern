import './PlantListItem';
import WaterListItem from './WaterListItem';
import wateringcan from '../images/wateringcan.gif'


export default function WaterTodaySection({ plants = [], onWatered = () => {}, onContextMenu = () => {} }) {

  return (
    <section>
      <div className="heading-bar">
         <h2>
          <span>💧</span>
          Water today!
        </h2>
      </div>
      
      {plants.length === 0 ? (
        <div className="finish-watering">
          <img className = "finish-watering-gif" src={wateringcan} alt=""></img>
          All caught up! No plants need watering today.
        </div>
      ) : (
 
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
      )}
    </section>
  );
}
