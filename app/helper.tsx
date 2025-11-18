

export const formatStatus = (status: string | undefined | null): string => {
  if (!status) return "No Status";

  const map: Record<string, string> = {
    notInterested: "Not Interested",
    followup: "Follow Up",
    DND: "DND",

  };

  // If matches in map → return formatted
  if (map[status]) return map[status];

  // Else convert camelCase to "Title Case"
  return status
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
};


export const customRound = (value: number): number => {
  return parseFloat(value.toFixed(2));
};

export const getNumberWithSuffix = (number: number): string => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return `${number}st`;
  } else if (number % 10 === 2 && number % 100 !== 12) {
    return `${number}nd`;
  } else if (number % 10 === 3 && number % 100 !== 13) {
    return `${number}rd`;
  } else {
    return `${number}th`;
  }
};


