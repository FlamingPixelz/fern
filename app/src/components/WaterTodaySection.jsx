import "./PlantListItem";
import WaterListItem from "./WaterListItem";
import wateringcan from "../images/wateringcan.gif";
import { speciesInfo } from "../plantData";

export default function WaterTodaySection({ plants = [], onWatered = () => {}, onEdit = () => {}, onDelete = () => {}, onSchedule = () => {} }) {
	return (
		<section>
			<div className="heading-bar">
				<h2>
					<span>💧</span>
					Water today!
				</h2>
				<button className="log-button">💧 Water Log</button>
			</div>

			{plants.length === 0 ? (
				<div className="finish-watering">
					<img className="finish-watering-gif" src={wateringcan} alt=""></img>
					All caught up! No plants need watering today.
				</div>
			) : (
				<div className="cards-row plant-scroll-wrapper">
					{plants.map(plant => (
						<WaterListItem
							key={plant.id}
							name={plant.name}
							species={plant.species}
							location={plant.location}
							nextWaterDays={plant.nextWaterDays}
							health={plant.health}
							image={speciesInfo[plant.species].image}
							onWatered={() => onWatered(plant.id)}
							onDelete={() => onDelete(plant.id)}
							onEdit={() => onEdit(plant.id)}
							onSchedule={days => onSchedule(plant.id, days)}
						/>
					))}
				</div>
			)}
		</section>
	);
}
