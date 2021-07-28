const checkEditor = (editors, userId) => {
  return editors.find(editorId => editorId === userId) === -1 ? false : true
}

export default checkEditor
