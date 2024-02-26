import React,{useState} from "react";

const EditRowModal = ({ rowData, onSave, onCancel }) => {
    const [editedData, setEditedData] = useState({ ...rowData });
  
    const handleFieldChange = (fieldName, value) => {
      setEditedData({ ...editedData, [fieldName]: value });
    };
  
    const handleSave = () => {
      onSave(editedData);
    };
  
    return (
      <div className="modal">
        <h2>Edit Row</h2>
        <label>Field 1:</label>
        <input
          type="text"
          value={editedData.field1}
          onChange={(e) => handleFieldChange('field1', e.target.value)}
        />
        <label>Field 2:</label>
        <input
          type="text"
          value={editedData.field2}
          onChange={(e) => handleFieldChange('field2', e.target.value)}
        />
        {/* Add more fields as needed */}
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };

  export default EditRowModal;