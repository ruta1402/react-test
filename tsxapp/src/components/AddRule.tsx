// AddRule.tsx
import React, { useState } from 'react';
import { Rule } from './types';

interface Props {
  onAdd: (newRule: Rule) => void;
}

const AddRule: React.FC<Props> = ({ onAdd }) => {
  const [newRule, setNewRule] = useState<Rule>({ name: '', type: '', value: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRule(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAdd = () => {
    onAdd(newRule);
    setNewRule({ name: '', type: '', value: '' });
  };

  return (
    <div>
      <h2>Add Rule</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={newRule.name}
        onChange={handleChange}
      />
      <label>Type:</label>
      <input
        type="text"
        name="type"
        value={newRule.type}
        onChange={handleChange}
      />
      <label>Value:</label>
      <input
        type="text"
        name="value"
        value={newRule.value}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddRule;
