
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatementType } from './types';

interface StatementTypeSelectionProps {
  filteredStatements: StatementType[];
  selectedStatement: string;
  onStatementSelect: (statementId: string) => void;
}

const StatementTypeSelection: React.FC<StatementTypeSelectionProps> = ({
  filteredStatements,
  selectedStatement,
  onStatementSelect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Statement Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          {filteredStatements.map((statement) => {
            const Icon = statement.icon;
            return (
              <Card 
                key={statement.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedStatement === statement.id 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'hover:bg-gray-50 hover:shadow-md'
                }`}
                onClick={() => onStatementSelect(statement.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedStatement === statement.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        selectedStatement === statement.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{statement.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{statement.description}</div>
                      <div className="text-xs text-blue-600 font-medium mt-2">
                        Category: {statement.category}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatementTypeSelection;
