export function getSourceFromURL(url: string): string {
  // Extract the slug from the URL path
  const pathParts = url.split("/")
  const slug = pathParts[pathParts.length - 1]

  return slug || "unknown"
}

export function preserveURLParams(currentURL: string, targetPath: string): string {
  const source = getSourceFromURL(currentURL)
  return `${targetPath}/${source}`
}

