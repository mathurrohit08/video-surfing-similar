
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
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (category === "All") {
          newParams.delete("category");
        } else {
          newParams.set("category", category);
        }
        return newParams;
      },
      { replace: true }
    );
  };

  return (
    <ul className="flex sm:flex-row flex-col gap-2">
      {categories.map((category) => (
        <li key={category}>
          <Button
            variant="secondary"
            onClick={() => handleCategoryClick(category)}
            className={`w-full sm:w-auto rounded-full px-4 py-2 whitespace-nowrap transition-colors ${
              currentCategory === category
                ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {category}
          </Button>
        </li>
      ))}
    </ul>
  );
};
