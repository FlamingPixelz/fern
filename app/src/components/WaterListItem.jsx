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
			<div>
				<div>
					{isOverdue && (
						<span>
							Overdue {overdueDays} {overdueDays === 1 ? "day" : "days"}!
						</span>
					)}
				</div>
				<div class="plant-name">{name}</div>
				<div class="plant-species">{species}</div>
				<span>{healthIcon}</span>
			</div>

			<img className="plantImage" src={image} alt={`${name} plant`} />

			<div className="card-location">{location}</div>

			<div>
				<button onClick={onWatered}>I've watered!</button>
				<button onClick={onContextMenu}>⋮</button>
			</div>
		</div>
	);
}
