// App.tsx
import React, { useState, useEffect } from 'react';
import RulesTable from './components/RulesTable';
import EditRule from './components/EditRule';
import AddRule from './components/AddRule';
import { Rule } from './components/types';

const App: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  useEffect(() => {
    // Fetch rules.json or load it from wherever it's stored
    // Example fetch:
    fetch('/rules.json')
      .then(response => response.json())
      .then(data => setRules(data))
      .catch(error => console.error('Error fetching rules.json:', error));
  }, []);

  const handleRuleEdit = (rule: Rule) => {
    setSelectedRule(rule);
  };

  const handleRuleAdd = (newRule: Rule) => {
    setRules([...rules, newRule]);
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
      <h1>Rules Table</h1>
      <button onClick={handleExportRules}>Export Rules</button>
      <RulesTable
        rules={rules}
        onEdit={handleRuleEdit}
        onDelete={handleRuleDelete}
      />
      {selectedRule && (
        <EditRule rule={selectedRule} onSave={handleRuleSave} />
      )}
      <AddRule onAdd={handleRuleAdd} />
    </div>
  );
};

export default App;
