import { useEffect, useRef, useState } from "react";
import CustomSchedulePopup from "./CustomSchedulePopup";
import DeletePlantPopup from "./DeletePlantPopup";
import "./Components.css";
import EditPropertiesPopup from "./EditPropertiesPopup";

export default function ContextMenu({ plantName = "your plant", onViewLog = () => {}, onUpdateProps = () => {}, onDelete = () => {}, onSchedule = () => {} }) {
	const menuRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activePopup, setActivePopup] = useState(null);

	useEffect(() => {
		if (!isMenuOpen) {
			return undefined;
		}

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

	const handleCustomSchedule = () => {
		setIsMenuOpen(false);
		setActivePopup("schedule");
	};

	const openDeletePopup = () => {
		setIsMenuOpen(false);
		setActivePopup("delete");
	};

	const handleEditProperties = () => {
		setIsMenuOpen(false);
		setActivePopup("edit");
	};

	const handleViewLog = () => {
		setIsMenuOpen(false);
		onViewLog();
	};

	return (
		<div className="context-menu-container" ref={menuRef}>
			<button className="context-menu-trigger" type="button" onClick={() => setIsMenuOpen(current => !current)}>
				<span />
				<span />
				<span />
			</button>

			{isMenuOpen && (
				<div className="context-menu-panel">
					<button type="button" onClick={handleCustomSchedule}>
						Customise schedule
					</button>
					<button type="button" onClick={handleEditProperties}>
						Edit details
					</button>
					<button type="button" onClick={handleViewLog}>
						View log
					</button>
					<button className="danger" type="button" onClick={openDeletePopup}>
						Delete plant
					</button>
				</div>
			)}

			{activePopup === "schedule" && (
				<CustomSchedulePopup
					onClose={closeAll}
					onUpdateSchedule={days => {
						closeAll();
						onSchedule(days);
					}}
				/>
			)}
			{activePopup === "delete" && <DeletePlantPopup plantName={plantName} onClose={closeAll} onDelete={onDelete} />}
			{activePopup === "edit" && (
				<EditPropertiesPopup
					onCancel={closeAll}
					onOk={props => {
						closeAll();
						onUpdateProps(props);
					}}
				/>
			)}
		</div>
	);
}
