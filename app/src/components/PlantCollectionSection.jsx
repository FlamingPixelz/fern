import "./PlantListItem.css";
import PlantListItem from "./PlantListItem";
import { speciesInfo } from "../plantData";

export default function MyPlantsSection({ plants = [], onAddPlant = () => {}, onContextMenu = () => {} }) {
	const plantsInGoodHealth = plants.filter(p => p.health === "happy").length;
	const plantsInBadHealth = plants.filter(p => p.health === "sad").length;

	return (
		<section>
			<div className="heading-bar">
				<h2>
					<span>🍃</span>
					My Plants
				</h2>

				<button className="add-plant-button" onClick={onAddPlant}>
					+ Add new plant
				</button>

				<span className="welcome-message"> Healthy: {plantsInGoodHealth}</span>
        		<span className="welcome-message"> Needs Love: {plantsInBadHealth}</span>
			</div>

			<div className="plant-scroll-wrapper">
				<ul className="plant-list">
					{plants.map(plant => (
						<PlantListItem
							key={plant.id}
							name={plant.name}
							species={plant.species}
							location={plant.location}
							nextWaterDays={plant.nextWaterDays}
							image={speciesInfo[plant.species].image}
							health={plant.health}
							onContextMenu={() => onContextMenu(plant.id)}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
