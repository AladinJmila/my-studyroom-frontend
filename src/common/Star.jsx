const Star = ({ starred, onStar }) => {
  let classes = 'fa fa-lg fa-star'
  if (!starred) classes += '-o'
  return (
    <i
      onClick={onStar}
      className={classes}
      style={
        starred
          ? { cursor: 'pointer', color: '#ffda33' }
          : { cursor: 'pointer' }
      }
      aria-hidden='true'
    ></i>
  )
}

export default Star
