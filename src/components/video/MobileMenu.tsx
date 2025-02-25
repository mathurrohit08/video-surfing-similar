
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Categories } from "@/components/Categories";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="h-full flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <nav className="flex-1 overflow-y-auto scrollbar-auto-hide">
            <Categories />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
