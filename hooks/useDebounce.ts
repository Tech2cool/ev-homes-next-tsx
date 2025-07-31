"use client";

import { useState, useEffect } from "react";

const useDebounce = (value:any, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("debacounce");
      setDebouncedValue(value);
    }, delay);

    console.log("debacounce useeffect");
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
