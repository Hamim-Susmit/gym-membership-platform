export const formatDateTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  return `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export const formatName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`.trim();
};
