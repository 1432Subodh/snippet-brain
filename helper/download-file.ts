export const handleDownload = (content: string, name: string, ext: string) => {
  // Sanitize file name
  const safeName = name.trim().replace(/\s+/g, '-').toLowerCase()
  const fullName = safeName.endsWith(ext) ? safeName : `${safeName}${ext}`

  // MIME type map
  const mimeTypes: Record<string, string> = {
    '.bash': 'text/x-sh',
    '.sh': 'text/x-sh',
    '.js': 'application/javascript',
    '.ts': 'application/typescript',
    '.py': 'text/x-python',
    '.json': 'application/json',
    '.html': 'text/html',
    '.css': 'text/css',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.xml': 'application/xml',
    '.yaml': 'application/x-yaml',
  }

  // Pick correct type or fallback to plain text
  const mimeType = mimeTypes[ext] || 'text/plain'

  // Create and trigger download
  const blob = new Blob([content], { type: mimeType })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fullName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
