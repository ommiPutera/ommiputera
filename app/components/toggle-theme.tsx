import { getSystemTheme, Theme, useTheme } from "@/utils/theme-provider";

import { Laptop, MoonStar, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ToggleTheme() {
  let [, setTheme] = useTheme();
  let systemTheme = getSystemTheme();

  return (
    <div className="flex w-fit gap-4 rounded-md border px-3 py-1.5">
      <Button className="w-full" onClick={() => setTheme(Theme.LIGHT)}>
        <Sun size="16" className="text-foreground" />
      </Button>
      <Button className="w-full" onClick={() => setTheme(Theme.DARK)}>
        <MoonStar size="16" />
      </Button>
      <Button className="w-full" onClick={() => setTheme(systemTheme)}>
        <Laptop size="16" />
      </Button>
    </div>
  );
}
