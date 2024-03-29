import React, { useState, useEffect } from 'react';
import EditRowModal from './components/EditRowModal';
import AddRowModal from './components/AddRowModal';

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [newRowData, setNewRowData] = useState({});

  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      // const response = await fetch('https://example.com/data.json');
      const data = [
        {
          "field1": "Value 1",
          "field2": "Value 2"
        },
        {
          "field1": "Value 3",
          "field2": "Value 4"
        }
      ];
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const handleEditRow = (rowIndex) => {
    setEditedRowIndex(rowIndex);
  };

  const handleSaveEdit = (editedData) => {
    const updatedData = [...jsonData];
    updatedData[editedRowIndex] = editedData;
    setJsonData(updatedData);
    setEditedRowIndex(null);
  };

  const handleAddRow = () => {
    setNewRowData({ field1: '', field2: '' }); // Initialize new row data
  };

  const handleSaveNewRow = (newData) => {
    setJsonData([...jsonData, newData]);
    setNewRowData({});
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = jsonData.filter((_, index) => index !== rowIndex);
    setJsonData(updatedData);
  };

  const handleExportJson = () => {
    const jsonDataString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonDataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>JSON Table</h1>
      <table>
        <thead>
          <tr>
            <th>Field 1</th>
            <th>Field 2</th>
            {/* Add more headers as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.field1}</td>
              <td>{row.field2}</td>
              {/* Render other fields as needed */}
              <td>
                <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
                <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleExportJson}>Export JSON</button>

      {/* Modal for editing existing row */}
      {editedRowIndex !== null && (
        <EditRowModal
          rowData={jsonData[editedRowIndex]}
          onSave={handleSaveEdit}
          onCancel={() => setEditedRowIndex(null)}
        />
      )}

      {/* Modal for adding new row */}
      {Object.keys(newRowData).length > 0 && (
        <AddRowModal
          rowData={newRowData}
          onSave={handleSaveNewRow}
          onCancel={() => setNewRowData({})}
        />
      )}
    </div>
  );
};




export default App;
