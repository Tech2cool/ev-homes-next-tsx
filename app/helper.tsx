

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

