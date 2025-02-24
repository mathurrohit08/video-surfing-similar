
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category}
          variant="secondary"
          className="rounded-full px-4 py-2 whitespace-nowrap hover:bg-gray-200 transition-colors"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
