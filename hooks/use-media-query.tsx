import React from "react";

export function useMediaQuery(query: string): boolean {
  const get = (query: string): boolean => {
    if (typeof window !== "undefined") return window.matchMedia(query).matches;
    return false;
  };

  const [matches, setMatches] = React.useState<boolean>(get(query));
  const handleChange = () => setMatches(get(query));

  React.useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) matchMedia.removeListener(handleChange);
      matchMedia.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
