
export interface StatementType {
  id: string;
  name: string;
  icon: any;
  description: string;
  category: string;
}

export interface StatementGeneratorProps {
  onGenerateStatement?: (type: string, params: any) => void;
}

export interface StatementFormData {
  selectedStatement: string;
  startDate?: Date;
  endDate?: Date;
  financialYear: string;
  language: string;
  downloadFormat: string;
}
