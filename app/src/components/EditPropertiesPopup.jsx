import { useState } from "react";
import { speciesInfo } from "../plantData";
import potSizeGuide from "../images/pot-size-guide.png";
import { parseFrequencyRange, parseLastWateredDate } from "../dateFunctions";

export default function EditPropertiesPopup({ onCancel = () => {}, onOk = () => {}, initialName = "", initialSpecies = "", initialLocation = "", initialWateringFrequency = null, initialLastWatered = "", title = "Add Plant Properties" }) {
	const [plantName, setName] = useState(initialName);
	const [species, setSpecies] = useState(initialSpecies);
	const [location, setLocation] = useState(initialLocation);
	const [manualWateringDays, setManualWateringDays] = useState("");
	const [lastWatered, setLastWatered] = useState(initialLastWatered);
	const [submitAttempted, setSubmitAttempted] = useState(false);

	const [minWaterDays, maxWaterDays] = parseFrequencyRange(species);
	const initialWateringDays = Number.isInteger(initialWateringFrequency) && initialWateringFrequency > 0 ? initialWateringFrequency : null;
	const defaultWateringDays = species === initialSpecies && initialWateringDays ? initialWateringDays : Math.round((minWaterDays + maxWaterDays) / 2);
	const manualWateringNumber = Number(manualWateringDays);
	const isManualWateringValid = /^\d+$/.test(manualWateringDays) && manualWateringNumber > 0;
	const wateringDays = isManualWateringValid ? manualWateringNumber : defaultWateringDays;
	const recommendation = species in speciesInfo ? speciesInfo[species].recommendedFrequency : "";
	const wateringWarning =
		manualWateringDays && !isManualWateringValid
			? "Please enter a whole number greater than 0."
			: isManualWateringValid && (manualWateringNumber < minWaterDays || manualWateringNumber > maxWaterDays)
				? `This is outside the recommended ${recommendation || `${minWaterDays}-${maxWaterDays} days`} range.`
				: "";
	const { warning: dateWarning } = parseLastWateredDate(lastWatered);
	const nameWarning = submitAttempted && !plantName.trim() ? "Name is required." : "";
	const speciesWarning = submitAttempted && !species ? "Please select a species." : "";
	const locationWarning = submitAttempted && !location.trim() ? "Location is required." : "";
	const lastWateredWarning = submitAttempted && !lastWatered.trim() ? "Last watered is required." : dateWarning;
	const blockingWateringWarning = manualWateringDays && !isManualWateringValid ? wateringWarning : "";

	const handleSpeciesChange = event => {
		setSpecies(event.target.value);
		setManualWateringDays("");
	};

	const handleSubmit = () => {
		setSubmitAttempted(true);

		if (!plantName.trim() || !species || !location.trim() || !lastWatered.trim() || dateWarning || blockingWateringWarning) {
			return;
		}

		onOk({ name: plantName, species, location, wateringFrequency: wateringDays, lastWatered });
	};

	return (
		<div className="overlay">
			<div className="popup">
				<div className="title-row">
					<span>{"\uD83C\uDF31"}</span>
					<h2 className="title">{title}</h2>
				</div>
				<div className="divider" />
				<div className="field-row">
					<label className="label">Name</label>
					<input className={`text-input ${nameWarning ? "warning-input" : ""}`} type="text" value={plantName} onChange={e => setName(e.target.value)} placeholder="Plant name" />
				</div>
				{nameWarning && <p className="field-warning">{nameWarning}</p>}
				<div className="field-row">
					<label className="label">Species</label>
					<div className="select-wrapper">
						<select className={`select ${speciesWarning ? "warning-input" : ""}`} value={species} onChange={handleSpeciesChange}>
							<option value="">-- Select species --</option>
							{Object.keys(speciesInfo).map(s => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
						<span className="select-arrow">{"\u25BE"}</span>
					</div>
				</div>
				{speciesWarning && <p className="field-warning">{speciesWarning}</p>}
				<div className="field-row">
					<label className="label">Location</label>
					<input className={`text-input ${locationWarning ? "warning-input" : ""}`} type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
				</div>
				{locationWarning && <p className="field-warning">{locationWarning}</p>}
				<div className="field-row field-row-stacked">
					<div className="field-heading">
						<label className="label">Water</label>
						<span className="field-value">{wateringDays} days</span>
					</div>
					<div className="watering-card">
						<input
							className="watering-range"
							type="range"
							min={minWaterDays}
							max={maxWaterDays}
							value={Math.min(Math.max(wateringDays, minWaterDays), maxWaterDays)}
							onChange={e => setManualWateringDays(e.target.value)}
							aria-label="Watering frequency"
						/>
						<img className="pot-size-guide" src={potSizeGuide} alt="Small, medium, and large pot guide" />
						<div className="pot-size-labels" aria-hidden="true">
							<span>Small pot</span>
							<span>Medium pot</span>
							<span>Large pot</span>
						</div>
						<div className="manual-days-row">
							<label htmlFor="manual-watering-days">Custom days</label>
							<input
								id="manual-watering-days"
								className={`text-input compact-input ${blockingWateringWarning ? "warning-input" : ""}`}
								type="text"
								inputMode="numeric"
								value={manualWateringDays}
								onChange={e => setManualWateringDays(e.target.value)}
								placeholder={`${minWaterDays}-${maxWaterDays}`}
							/>
						</div>
						<p className={`form-tip ${wateringWarning ? "form-tip-warning" : ""}`}>
							<span className="tip-icon" aria-hidden="true">
								i
							</span>
							<span>{wateringWarning || (species ? `${species} is recommended every ${recommendation}.` : "Select a species to see the recommended watering frequency.")}</span>
						</p>
					</div>
				</div>
				<div className="field-row last-watered-row">
					<label className="label">Last watered</label>
					<input className={`text-input ${lastWateredWarning ? "warning-input" : ""}`} type="text" value={lastWatered} onChange={e => setLastWatered(e.target.value)} placeholder="dd/mm/yyyy" />
				</div>
				{lastWateredWarning && <p className="field-warning field-warning-last-watered">{lastWateredWarning}</p>}
				<div className="divider" />
				<div className="button-row">
					<button className="cancel-btn" onClick={onCancel}>
						Cancel
					</button>
					<button className="ok-btn" onClick={handleSubmit}>
						OK
					</button>
				</div>
			</div>
		</div>
	);
}
