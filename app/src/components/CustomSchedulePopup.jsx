import { useState } from "react";
import { speciesInfo } from "../plantData";

export default function CustomSchedulePopup({ plantSpecies = "", currentWateringDays = null, onClose = () => {}, onUpdateSchedule = () => {} }) {
	const [wateringDays, setWateringDays] = useState("");
	const [restoreMessage, setRestoreMessage] = useState("");
	const recommendation = plantSpecies in speciesInfo ? speciesInfo[plantSpecies].recommendedFrequency : "7-14 days";
	const recommendationText = recommendation.replace(/\s*days?$/i, "").replace("-", " - ");
	const originalWateringDays = Number.isInteger(currentWateringDays) && currentWateringDays > 0 ? currentWateringDays : null;

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
	const canSubmit = wateringDays !== "" && validationMessage === "";

	const handleSubmit = () => {
		if (!canSubmit) {
			return;
		}

		onUpdateSchedule(Number(wateringDays));
	};

	const handleRestoreDefault = () => {
		if (!originalWateringDays) {
			return;
		}

		setWateringDays(String(originalWateringDays));
		setRestoreMessage(`Restored to ${originalWateringDays} days.`);
	};

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
						onChange={event => {
							setWateringDays(event.target.value);
							setRestoreMessage("");
						}}
						placeholder={`recommended ${recommendationText}`}
					/>
					<span>days</span>
				</label>
				{validationMessage && <p className="schedule-warning">{validationMessage}</p>}
				{restoreMessage && <p className="schedule-restored">{restoreMessage}</p>}
				<div className="context-popup-divider" />
				<div className="context-popup-actions">
					<button className="restore-default" type="button" onClick={handleRestoreDefault}>
						Restore default
					</button>
					<button type="button" onClick={onClose}>
						Cancel
					</button>
					<button className="confirm" type="button" onClick={handleSubmit} disabled={!canSubmit}>
						OK
					</button>
				</div>
			</section>
		</div>
	);
}
