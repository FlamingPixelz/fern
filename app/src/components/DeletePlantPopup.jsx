export default function DeletePlantPopup({ plantName, onClose }) {
  return (
    <div className="context-modal-backdrop">
      <section className="context-popup delete-popup">
        <div className="context-popup-title-row">
          <span className="context-popup-leaf">{"\uD83C\uDF3F"}</span>
          <h2>Delete Plant</h2>
        </div>
        <div className="context-popup-divider" />
        <h3>Are you sure you want to delete {plantName}?</h3>
        <p className="delete-warning">This action is irreversible.</p>
        <div className="context-popup-divider" />
        <div className="context-popup-actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button className="danger" type="button" onClick={onClose}>Delete</button>
        </div>
      </section>
    </div>
  );
}
