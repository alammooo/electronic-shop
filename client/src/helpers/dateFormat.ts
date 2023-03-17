export function formatDate(text: string) {
  const date = new Date(text)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
