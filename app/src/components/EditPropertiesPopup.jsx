import { useState } from "react";
import { speciesInfo } from "../plantData";

export default function EditPropertiesPopup({ 
  onCancel = () => {}, 
  onOk = () => {},
  initialName = "",
  initialSpecies = "",
  initialLocation = ""
}) {
  const [plantName, setName] = useState(initialName);
  const [species, setSpecies] = useState(initialSpecies);
  const [location, setLocation] = useState(initialLocation);

  return (
    <div className="overlay">
      <div className="popup">
        <div className="title-row">
          <span>🌿</span>
          <h2 className="title">Plant Properties</h2>
        </div>
        <div className="divider" />
        <div className="field-row">
          <label className="label">Name</label>
          <input className="text-input" type="text" value={plantName} onChange={e => setName(e.target.value)} placeholder="Plant name" />
        </div>
        <div className="field-row">
          <label className="label">Species</label>
          <div className="select-wrapper">
            <select className="select" value={species} onChange={e => setSpecies(e.target.value)}>
              <option value="">-- Select species --</option>
              {Object.keys(speciesInfo).map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span className="select-arrow">▾</span>
          </div>
        </div>
        <div className="field-row">
          <label className="label">Location</label>
          <input className="text-input" type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
        </div>
        <div className="divider" />
        <div className="button-row">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="ok-btn"
            onClick={() => {
              onOk({ name: plantName, species, location });
            }}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
