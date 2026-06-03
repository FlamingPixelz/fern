import './PlantListItem.css';

 const HEALTH_ICONS = {
  happy:   { icon: '🙂', label: 'happy'   },
  neutral: { icon: '😐', label: 'neutral' },
  sad:     { icon: '😟', label: 'unhappy' },
};

export default function PlantListItem({
  name = 'Plant',
  species = '',
  location = '',
  nextWaterDays = 0,
  health = 'neutral',
  image = null,
  onContextMenu = () => {},
}) {

const { icon: healthIcon } = HEALTH_ICONS[health] ?? HEALTH_ICONS.neutral;
 
  return (
    <div className = "plant-card">
    <li>
      <div className = "card-header">
         <span>{healthIcon}</span>

         <button
          className = "card-button"
          onClick={onContextMenu}
          aria-label={`More options for ${name}`}
        >
          ⋮
        </button>
      </div>

        <div className = "container">
          <div className="plant-name">{name}</div>
          <div className="plant-species">{species}</div>
        </div>

      <img
      className= "plantImage"
      src={image}
      alt={`${name} plant`}
      />
 
      <div className="card-location">{location}</div>
 
        <span className="plant-next-water"> 💧{nextWaterDays} Days </span>
         
    </li>
    </div>
  );
}
