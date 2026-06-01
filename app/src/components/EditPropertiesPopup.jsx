import { useState } from "react";

const SPECIES_OPTIONS = [
  "Pothos","Snake Plant","Fiddle-leaf Fig","Peace Lily",
  "Monstera","Succulent","Basil","Lavender","Aloe Vera","Spider Plant",
];

export default function EditPropertiesPopup({ onCancel = () => {}, onOk = () => {} }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.titleRow}>
          <span>🌿</span>
          <h2 style={styles.title}>Edit Plant Properties</h2>
        </div>
        <div style={styles.divider} />
        <div style={styles.fieldRow}>
          <label style={styles.label}>Name</label>
          <input style={styles.textInput} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Plant name" />
        </div>
        <div style={styles.fieldRow}>
          <label style={styles.label}>Species</label>
          <div style={styles.selectWrapper}>
            <select style={styles.select} value={species} onChange={(e) => setSpecies(e.target.value)}>
              <option value="">-- Select species --</option>
              {SPECIES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span style={styles.selectArrow}>▾</span>
          </div>
        </div>
        <div style={styles.fieldRow}>
          <label style={styles.label}>Location</label>
          <input style={styles.textInput} type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        </div>
        <div style={styles.divider} />
        <div style={styles.buttonRow}>
          <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={styles.okBtn} onClick={() => onOk({ name, species, location })}>OK</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position:"fixed", inset:0, background:"rgba(60,80,50,0.07)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 },
  popup: { background:"#ffffff", border:"1.5px solid #d0c8bc", borderRadius:"16px", padding:"24px 28px 20px 28px", width:"320px", boxShadow:"0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.07)", fontFamily:"sans-serif" },
  titleRow: { display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" },
  title: { margin:0, fontSize:"15px", fontWeight:"500", color:"#1a1a1a" },
  divider: { height:"0.5px", background:"#e0dbd3", margin:"16px 0" },
  fieldRow: { display:"flex", alignItems:"center", marginBottom:"14px", gap:"12px" },
  label: { width:"68px", fontSize:"13px", color:"#6b6560", flexShrink:0 },
  textInput: { flex:1, border:"0.5px solid #c8c0b8", borderRadius:"8px", padding:"7px 10px", fontSize:"13px", color:"#1a1a1a", background:"#f7f5f2", outline:"none" },
  selectWrapper: { flex:1, position:"relative", display:"flex", alignItems:"center" },
  select: { width:"100%", border:"0.5px solid #c8c0b8", borderRadius:"8px", padding:"7px 28px 7px 10px", fontSize:"13px", color:"#1a1a1a", background:"#f7f5f2", outline:"none", appearance:"none", cursor:"pointer" },
  selectArrow: { position:"absolute", right:"10px", pointerEvents:"none", color:"#9a9088", fontSize:"13px" },
  buttonRow: { display:"flex", justifyContent:"flex-end", gap:"10px", marginTop:"4px" },
  cancelBtn: { background:"transparent", border:"0.5px solid #c8c0b8", borderRadius:"8px", padding:"7px 18px", fontSize:"13px", color:"#6b6560", cursor:"pointer" },
  okBtn: { background:"#4e8b4e", border:"none", borderRadius:"8px", padding:"7px 22px", fontSize:"13px", color:"#ffffff", fontWeight:"500", cursor:"pointer" },
};
