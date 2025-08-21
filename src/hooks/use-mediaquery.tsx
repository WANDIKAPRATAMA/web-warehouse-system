import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const listener = (event: any) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener
      ? mediaQueryList.addEventListener("change", listener)
      : mediaQueryList.addListener(listener); // fallback for older browsers

    // Set the initial value in case it changed since first render
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener
        ? mediaQueryList.removeEventListener("change", listener)
        : mediaQueryList.removeListener(listener);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
