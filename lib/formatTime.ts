export function formatTime(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
