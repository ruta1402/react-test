// App.tsx
import React, { useState, useEffect } from 'react';
import RulesTable from './components/RulesTable';
import EditRule from './components/EditRule';
import AddRule from './components/AddRule';
import { Rule } from './components/types';

const App: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [showAddRule, setShowAddRule] = useState<boolean>(false); // State variable to control visibility of AddRule component

  useEffect(() => {
    // Fetch rules.json or load it from wherever it's stored
    // Example fetch:
    const data = [
      {
        "name": "rule1",
        "type": "type1",
        "value": "value1"
      },
      {
        "name": "rule2",
        "type": "type2",
        "value": "value2"
      },
      {
        "name": "rule3",
        "type": "type3",
        "value": "value3"
      }
    ];

    setRules(data);
  }, []);

  const handleRuleEdit = (rule: Rule) => {
    setSelectedRule(rule);
  };

  const handleRuleAdd = (newRule: Rule) => {
    setRules([...rules, newRule]);
    setShowAddRule(false); // Hide AddRule component after adding a rule
  };

  const handleRuleSave = (updatedRule: Rule) => {
    const updatedRules = rules.map(rule =>
      rule.name === updatedRule.name ? updatedRule : rule
    );
    setRules(updatedRules);
    setSelectedRule(null);
  };

  const handleRuleDelete = (name: string) => {
    const updatedRules = rules.filter(rule => rule.name !== name);
    setRules(updatedRules);
  };

  const handleExportRules = () => {
    // Convert rules to JSON and export
    const json = JSON.stringify(rules);
    // Example code to initiate file download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      
      <button onClick={handleExportRules}>Export Rules</button>
      <RulesTable
        rules={rules}
        onEdit={handleRuleEdit}
        onDelete={handleRuleDelete}
      />
      {selectedRule && (
        <EditRule rule={selectedRule} onSave={handleRuleSave} />
      )}
      {/* Render AddRule component only if showAddRule is true */}
      {showAddRule && <AddRule onAdd={handleRuleAdd} />}
      {/* Button to toggle the visibility of AddRule component */}
      <button onClick={() => setShowAddRule(!showAddRule)}>Add Rule</button>
    </div>
  );
};

export default App;
