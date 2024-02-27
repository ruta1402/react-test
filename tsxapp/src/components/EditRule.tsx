// EditRule.tsx
import React, { useState } from 'react';
import { Rule } from './types';

interface Props {
  rule: Rule;
  onSave: (rule: Rule) => void;
}

const EditRule: React.FC<Props> = ({ rule, onSave }) => {
  const [editedRule, setEditedRule] = useState<Rule>(rule);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRule(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedRule);
  };

  return (
    <div>
      <h2>Edit Rule</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={editedRule.name}
        onChange={handleChange}
      />
      <label>Type:</label>
      <input
        type="text"
        name="type"
        value={editedRule.type}
        onChange={handleChange}
      />
      <label>Value:</label>
      <input
        type="text"
        name="value"
        value={editedRule.value}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditRule;
