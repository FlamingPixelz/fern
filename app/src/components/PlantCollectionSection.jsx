import "./Components.css";
import PlantListItem from "./PlantListItem";
import { speciesInfo } from "../plantData";
import alivePlant from "../images/alocasia.png"
import deadPlant from "../images/dead.png"

export default function MyPlantsSection({ plants = [], onAddPlant = () => {}, onDelete = () => {}, onEdit = () => {}, onSchedule = () => {} }) {
	const plantsInGoodHealth = plants.filter(p => p.health === "happy").length;
	const plantsInBadHealth = plants.filter(p => p.health === "sad").length;
	return (
		<section>
			<div className="heading-bar">
				<h2>
					<span>🍃</span>
					My Plants
				</h2>

				<span className="welcome-message"> <img className ="status-icon" src={alivePlant} alt=""></img>
				Healthy: {plantsInGoodHealth}
				</span>
				<span className="welcome-message"> <img className ="status-icon" src={deadPlant} alt=""></img>
				Needs Love: {plantsInBadHealth}</span>

				<button className="add-plant-button" onClick={onAddPlant}>
					+ Add new plant
				</button>

			</div>

			<div className="plant-scroll-wrapper">
				<ul className="plant-list">
					{plants.map(plant => (
						<PlantListItem
							key={plant.id}
							name={plant.name}
							species={plant.species}
							location={plant.location}
							interval={plant.interval}
							nextWaterDays={plant.nextWaterDays}
							lastWatered={plant.lastWatered}
							image={speciesInfo[plant.species].image}
							health={plant.health}
							onDelete={() => onDelete(plant.id)}
							onEdit={props => onEdit(plant.id, props)}
							onSchedule={days => onSchedule(plant.id, days)}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
