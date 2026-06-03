import './PlantListItem.css';
import happyIcon from '../images/happyIcon.png'
import neutralIcon from '../images/neutralIcon.png'
import sadIcon from '../images/sadIcon.png'

 const HEALTH_ICONS = {
  happy:   { icon: happyIcon, label: 'happy', tooltip: 'You water this plant very consistently!'},
  neutral: { icon: neutralIcon, label: 'neutral', tooltip: 'The watering schedule for this plant has been mixed' },
  sad:     { icon: sadIcon, label: 'unhappy', tooltip: 'Your plant needs more attention! Remember to water it on time!' },
};
export default function WaterListItem({ name = "Plant", species = "", location = "", nextWaterDays = 0, health = "neutral", image = null, onWatered = () => {}, onContextMenu = () => {} }) {
	const isOverdue = nextWaterDays < 0;
	const overdueDays = Math.abs(nextWaterDays);
	const { icon: healthIcon, label: healthLabel, tooltip: healthTooltip } = HEALTH_ICONS[health] ?? HEALTH_ICONS.neutral;

	return (
		<div class="plant-card">
			<div className ="card-header">
				<div className = "icon-wrapper">
					<img className="health-icon" src={healthIcon} alt={healthLabel}/>
					 <span className = "tooltip">{healthTooltip}</span>
				</div>
				<div>
					{isOverdue && (
						<span className ="overdue">
							Overdue {overdueDays} {overdueDays === 1 ? "day" : "days"}!
						</span>
					)}
				</div>
				<button className = "context-button" onClick={onContextMenu}>⋮</button>
			</div>
			<div>
	
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
