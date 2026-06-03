import "./PlantListItem.css";

const HEALTH_ICONS = {
	happy: { icon: "🙂", label: "happy" },
	neutral: { icon: "😐", label: "neutral" },
	sad: { icon: "😟", label: "unhappy" }
};

export default function WaterListItem({ name = "Plant", species = "", location = "", nextWaterDays = 0, health = "neutral", image = null, onWatered = () => {}, onContextMenu = () => {} }) {
	const isOverdue = nextWaterDays < 0;
	const overdueDays = Math.abs(nextWaterDays);
	const { icon: healthIcon } = HEALTH_ICONS[health] ?? HEALTH_ICONS.neutral;

	return (
		<div class="plant-card">
			<div className ="card-header">
				<span>{healthIcon}</span>
				<button className = "context-button" onClick={onContextMenu}>⋮</button>
			</div>
			<div>
				<div>
					{isOverdue && (
						<span>
							Overdue {overdueDays} {overdueDays === 1 ? "day" : "days"}!
						</span>
					)}
				</div>
			<div>
				
			</div>
				<div className="plant-name">{name}</div>
				<div className="plant-species">{species}</div>
			</div>

			<img className="plantImage" src={image} alt={`${name} plant`} />

			<div className="card-location">{location}</div>

			<div className ="container">
				<button className="watered-button" onClick={onWatered}>I've watered!</button>
			</div>
		</div>
	);
}
