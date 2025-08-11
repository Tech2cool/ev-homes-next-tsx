import { useEffect } from "react";

export const useClickOutside = ({ refs, handler, active = true }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );
      if (clickedOutside) {
        handler();
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler, active]);
};
