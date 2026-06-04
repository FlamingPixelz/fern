import "./Components.css";
import happyIcon from "../images/happyIcon.png";
import neutralIcon from "../images/neutralIcon.png";
import sadIcon from "../images/sadIcon.png";
import ContextMenu from "./ContextMenu";

const HEALTH_ICONS = {
  happy: { icon: happyIcon, label: "happy", tooltip: "You water this plant very consistently!" },
  neutral: { icon: neutralIcon, label: "neutral", tooltip: "The watering schedule for this plant has been mixed" },
  sad: { icon: sadIcon, label: "unhappy", tooltip: "Your plant needs more attention! Remember to water it on time!" }
};

export default function PlantListItem({ name = "Plant", species = "", location = "", nextWaterDays = 0, health = "neutral", image = null, onEdit = () => {}, onDelete = () => {}, onSchedule = () => {} }) {
  const { icon: healthIcon, label: healthLabel, tooltip: healthTooltip } = HEALTH_ICONS[health] ?? HEALTH_ICONS.neutral;
  const isOverdue = nextWaterDays < 0;
  const overdueDays = Math.abs(nextWaterDays);

  return (
    <div className="plant-card">
      <div className={`water-card ${isOverdue ? "water-card-overdue" : ""}`}>
        <li>
          <div className="card-header">
            <div className="icon-wrapper">
              <img className="health-icon" src={healthIcon} alt={healthLabel} />
              <span className="tooltip">{healthTooltip}</span>
            </div>
            <ContextMenu 
              plantName={name}
              plantSpecies={species}
              plantLocation={location}
              onViewLog={() => alert("You are navigating to another page...")} 
              onUpdateProps={onEdit} 
              onDelete={onDelete} 
              onSchedule={onSchedule} 
            />
          </div>
          <div className="plant-name">{name}</div>
          <div className="plant-species">{species}</div>
          <img className="plantImage" src={image} alt={`${name} plant`} />
          <div className="card-location">{location}</div>
          {isOverdue ? (
            <span className="plant-next-water"> 💧Overdue {overdueDays} Day{overdueDays === 1 ? "" : "s"} </span>
          ) : (
            <span className="plant-next-water"> 💧{nextWaterDays} Day{nextWaterDays === 1 ? "" : "s"} </span>
          )}
        </li>
      </div>
    </div>
  );
}
