
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  placeholder: string;
  loading: boolean;
}

const SearchInput = ({ value, onChange, onFocus, placeholder, loading }: SearchInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={onFocus}
        className="pl-10 pr-4 h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4 animate-spin" />
      )}
    </div>
  );
};

export default SearchInput;
