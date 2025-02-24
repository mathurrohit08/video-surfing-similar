
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const query = searchTerm.trim();
    if (query) {
      setSearchParams({ q: query });
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  }, [searchTerm, setSearchParams, searchParams]);

  return (
    <div className="relative max-w-2xl w-full mx-auto">
      <Input
        type="search"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 h-12 rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500 transition-all duration-300"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
};
