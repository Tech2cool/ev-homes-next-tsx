import { useEffect, RefObject } from "react";

interface UseClickOutsideProps {
  refs: RefObject<HTMLElement | null>[];
  handler: () => void;
  active?: boolean;
}

export const useClickOutside = ({
  refs,
  handler,
  active = true,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = refs.every(
        (ref) => !ref.current || !ref.current.contains(event.target as Node)
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
