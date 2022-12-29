export function isVisible(name, version, extension) {
  if (name === 'psp37' && (extension === 'Batch' || extension === 'Enumerable') && version < 'v2.1.0') return false
  if (name === 'psp34' && extension === 'Enumerable' && version < 'v1.6.0') return false
  return true
}
