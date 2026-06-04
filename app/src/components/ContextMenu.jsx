import { useEffect, useRef, useState } from "react";
import CustomSchedulePopup from "./CustomSchedulePopup";
import DeletePlantPopup from "./DeletePlantPopup";
import "./Components.css";
import EditPropertiesPopup from "./EditPropertiesPopup";

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function deriveLastWatered(interval, nextWaterDays) {
  if (!Number.isFinite(interval) || !Number.isFinite(nextWaterDays)) return "";

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (interval - nextWaterDays));

  return formatDate(date);
}

export default function ContextMenu({ 
  plantName = "your plant",
  plantSpecies = "",
  plantLocation = "",
  plantInterval = null,
  plantNextWaterDays = null,
  plantLastWatered = "",
  onViewLog = () => {}, 
  onUpdateProps = () => {}, 
  onDelete = () => {}, 
  onSchedule = () => {} 
}) {
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const initialLastWatered = plantLastWatered || deriveLastWatered(plantInterval, plantNextWaterDays);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeMenuOnOutsideClick = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", closeMenuOnOutsideClick);
    };
  }, [isMenuOpen]);

  const closeAll = () => {
    setIsMenuOpen(false);
    setActivePopup(null);
  };

  return (
    <div className="context-menu-container" ref={menuRef}>
      <button className="context-menu-trigger" type="button" onClick={() => setIsMenuOpen(current => !current)}>
        <span /><span /><span />
      </button>
      {isMenuOpen && (
        <div className="context-menu-panel">
          <button type="button" onClick={() => { setIsMenuOpen(false); setActivePopup("schedule"); }}>Customise schedule</button>
          <button type="button" onClick={() => { setIsMenuOpen(false); setActivePopup("edit"); }}>Edit details</button>
          <button type="button" onClick={() => { setIsMenuOpen(false); onViewLog(); }}>View log</button>
          <button className="danger" type="button" onClick={() => { setIsMenuOpen(false); setActivePopup("delete"); }}>Delete plant</button>
        </div>
      )}
      {activePopup === "schedule" && (
        <CustomSchedulePopup
          plantSpecies={plantSpecies}
          onClose={closeAll}
          onUpdateSchedule={days => { closeAll(); onSchedule(days); }}
        />
      )}
      {activePopup === "delete" && (
        <DeletePlantPopup plantName={plantName} onClose={closeAll} onDelete={onDelete} />
      )}
      {activePopup === "edit" && (
        <EditPropertiesPopup
          title="Edit Plant Properties"
          initialName={plantName}
          initialSpecies={plantSpecies}
          initialLocation={plantLocation}
          initialWateringFrequency={plantInterval}
          initialLastWatered={initialLastWatered}
          onCancel={closeAll}
          onOk={props => { closeAll(); onUpdateProps(props); }}
        />
      )}
    </div>
  );
}
