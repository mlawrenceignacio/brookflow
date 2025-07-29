export function extractPlainText(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n") // Convert <br> to newlines
    .replace(/<\/p>|<\/div>|<\/li>/gi, "\n") // Add newlines for block endings
    .replace(/<[^>]+>/g, "") // Remove all remaining tags
    .replace(/&nbsp;|&#160;/g, " ") // Convert HTML spaces
    .replace(/\n+/g, "\n") // Collapse multiple newlines
    .trim();
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateAndTime(timestamp) {
  const dateObj = new Date(timestamp);

  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    second: "2-digit",
  });

  const date = dateObj.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  return { time, date };
}
