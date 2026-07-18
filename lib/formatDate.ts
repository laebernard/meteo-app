export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
