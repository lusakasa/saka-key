export function generateHintStrings (characters, count) {
  const hints = ['']
  let offset = 0
  while (hints.length - offset < count || hints.length === 1) {
    const hint = hints[offset++]
    for (const c of characters) {
      hints.push(hint + c)
    }
  }
  return hints.slice(offset, offset + count)
}
