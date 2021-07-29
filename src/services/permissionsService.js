export const isEditor = (editors, userId) => {
  return Boolean(editors.find(editorId => editorId === userId))
}
