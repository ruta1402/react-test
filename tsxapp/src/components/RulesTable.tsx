// RulesTable.tsx
import React from 'react';
import { Rule } from './types';

interface Props {
  rules: Rule[];
  onEdit: (rule: Rule) => void;
  onDelete: (name: string) => void;
}

const RulesTable: React.FC<Props> = ({ rules, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Value</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rules.map(rule => (
          <tr key={rule.name}>
            <td>{rule.name}</td>
            <td>{rule.type}</td>
            <td>{rule.value}</td>
            <td>
              <button onClick={() => onEdit(rule)}>Edit</button>
              <button onClick={() => onDelete(rule.name)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RulesTable;
