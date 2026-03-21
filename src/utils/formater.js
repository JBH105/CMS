// Capitalize each word
export function capitalizeWords(str) {
  if (!str) return "";

  return str
    .trim()
    .split(/\s+/) // handle multiple spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}