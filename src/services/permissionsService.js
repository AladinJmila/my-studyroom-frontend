export const isEditor = (editors, userId) => {
  return editors.find(editorId => editorId === userId) === -1 ? false : true
}
