export const userIsEditor = (item, userId) => {
  const permission =
    item.creatorId === userId ||
    Boolean(item?.subject?.editors.find(editorId => editorId === userId)) ||
    Boolean(item?.editors?.find(editorId => editorId === userId))
  return permission
}
