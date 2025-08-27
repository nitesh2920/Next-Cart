'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useProductStore } from '@/store/productStore';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchBar: React.FC = () => {
  const { filters, setSearch } = useProductStore();
  const [searchTerm, setSearchTerm] = React.useState(filters.search);
  const debouncedSearch = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="relative w-full max-w-md flex items-center">
      <div className="absolute  pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
