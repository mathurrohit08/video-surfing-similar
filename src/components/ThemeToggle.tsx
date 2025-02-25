
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 relative animate-fade-in"
    >
      <Sun className={`h-4 w-4 absolute transition-all ${
        theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
      }`} />
      <Moon className={`h-4 w-4 absolute transition-all ${
        theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
