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
    <div class = "plant-card">
    <li>
      <div class = "container">
        <div>
          <div class="plant-name">{name}</div>
          <div class="plant-species">{species}</div>
        </div>
        <button
          onClick={onContextMenu}
          aria-label={`More options for ${name}`}
        >
          ⋮
        </button>
         
         <span>
          {healthIcon}
        </span>
      </div>
 
      <img
      className= "plantImage"
      src={image}
      alt={`${name} plant`}
      />
 
      <div class="card-location">{location}</div>
 
        <span class="plant-next-water"> 💧{nextWaterDays} Days </span>
    </li>
    </div>
  );
}
