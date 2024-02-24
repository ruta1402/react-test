import React, { useState, useEffect } from 'react';

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const response = await fetch('https://example.com/data.json');
      const data = await response.json();
      setJsonData(data);
      setEditedData([...data]); // Clone the original data for editing
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const handleEdit = (value, rowIndex, columnName) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][columnName] = value;
    setEditedData(updatedData);
  };

  const handleAddRow = () => {
    setEditedData([...editedData, { /* default values for new row */ }]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = editedData.filter((_, index) => index !== rowIndex);
    setEditedData(updatedData);
  };

  const generateJsonOutput = () => {
    // Generate JSON output from editedData
    const jsonData = JSON.stringify(editedData, null, 2);
    // Create a blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    // Create a link element and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Editable JSON Table</h1>
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
          {editedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  value={row.field1}
                  onChange={(e) => handleEdit(e.target.value, rowIndex, 'field1')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.field2}
                  onChange={(e) => handleEdit(e.target.value, rowIndex, 'field2')}
                />
              </td>
              {/* Add more cells for other fields */}
              <td>
                <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={generateJsonOutput}>Download JSON</button>
    </div>
  );
};

export default App;
