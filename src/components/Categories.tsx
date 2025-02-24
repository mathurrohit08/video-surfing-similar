
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Movies",
  "News",
  "Live",
  "Sports",
  "Education",
  "Technology",
];

export const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category}
          variant="secondary"
          onClick={() => handleCategoryClick(category)}
          className={`rounded-full px-4 py-2 whitespace-nowrap transition-colors ${
            currentCategory === category
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "hover:bg-gray-200"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
