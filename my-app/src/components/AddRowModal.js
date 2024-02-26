import React,{useState} from "react";

const AddRowModal = ({ rowData, onSave, onCancel }) => {
    const [field1, setField1] = useState(rowData.field1);
    const [field2, setField2] = useState(rowData.field2);
  
    const handleSave = () => {
      onSave({ field1, field2 });
      setField1('');
      setField2('');
    };
  
    return (
      <div className="modal">
        <h2>Add New Row</h2>
        <label>Field 1:</label>
        <input
          type="text"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
        />
        <label>Field 2:</label>
        <input
          type="text"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
        />
        {/* Add more fields as needed */}
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };

export default AddRowModal;
  