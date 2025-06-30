
import React from 'react';
import StatementGeneratorHeader from './statement/StatementGeneratorHeader';
import CategoryFilter from './statement/CategoryFilter';
import StatementTypeSelection from './statement/StatementTypeSelection';
import StatementParametersForm from './statement/StatementParametersForm';
import ComplianceFooter from './statement/ComplianceFooter';
import { useStatementGenerator } from './statement/useStatementGenerator';
import { statementTypes } from './statement/statementTypes';
import { StatementGeneratorProps } from './statement/types';

const StatementGenerator: React.FC<StatementGeneratorProps> = ({ onGenerateStatement }) => {
  const {
    formData,
    selectedCategory,
    isGenerating,
    updateFormData,
    setSelectedCategory,
    handleGenerateStatement
  } = useStatementGenerator(onGenerateStatement);

  const filteredStatements = selectedCategory === 'All' 
    ? statementTypes 
    : statementTypes.filter(s => s.category === selectedCategory);

  const selectedStatementData = statementTypes.find(s => s.id === formData.selectedStatement);

  return (
    <div className="space-y-6">
      <StatementGeneratorHeader />

      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <StatementTypeSelection
        filteredStatements={filteredStatements}
        selectedStatement={formData.selectedStatement}
        onStatementSelect={(statementId) => updateFormData('selectedStatement', statementId)}
      />

      {formData.selectedStatement && (
        <StatementParametersForm
          selectedStatementData={selectedStatementData}
          formData={formData}
          onFormDataChange={updateFormData}
          onGenerate={handleGenerateStatement}
          isGenerating={isGenerating}
        />
      )}

      <ComplianceFooter />
    </div>
  );
};

export default StatementGenerator;
