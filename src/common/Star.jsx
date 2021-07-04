const Star = ({ starred, onStar }) => {
  let classes = 'fa fa-star'
  if (!starred) classes += '-o'
  return (
    <i
      onClick={onStar}
      className={classes}
      style={starred ? { color: '#ffe563' } : { color: 'inherit' }}
      aria-hidden='true'
    ></i>
  )
}

export default Star
