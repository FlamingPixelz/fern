import { useState } from "react";

export default function CustomSchedulePopup({ onClose }) {
  const [wateringDays, setWateringDays] = useState("");

  const getValidationMessage = () => {
    if (wateringDays === "") {
      return "";
    }

    if (!/^\d+$/.test(wateringDays)) {
      return "Please enter whole numbers only.";
    }

    if (Number(wateringDays) < 1) {
      return "Watering frequency must be at least 1 day.";
    }

    return "";
  };

  const validationMessage = getValidationMessage();

  return (
    <div className="context-modal-backdrop">
      <section className="context-popup schedule-popup">
        <div className="context-popup-title-row">
          <span className="context-popup-leaf">{"\uD83C\uDF3F"}</span>
          <h2>Custom Schedule</h2>
        </div>
        <div className="context-popup-divider" />
        <label className="schedule-input-row">
          <input
            type="text"
            inputMode="numeric"
            value={wateringDays}
            onChange={(event) => setWateringDays(event.target.value)}
            placeholder="recommended 7 - 14"
          />
          <span>days</span>
        </label>
        {validationMessage && <p className="schedule-warning">{validationMessage}</p>}
        <div className="context-popup-divider" />
        <div className="context-popup-actions">
          <button className="restore-default" type="button">Restore default</button>
          <button type="button" onClick={onClose}>Cancel</button>
          <button className="confirm" type="button" onClick={onClose}>OK</button>
        </div>
      </section>
    </div>
  );
}
